// now we will import the ride service
const rideService = require("../services/ride.service");
const Ride = require("../models/ride.model");
const userModel = require("../models/user.model");
// import the validation error
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocket } = require("../socket");
// main logic will be here
module.exports.createRide = async (req, res, next) => {
    // get the errors
    const errors = validationResult(req);
    // if there are any error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //  get the details from the body
    const { userId, pickup_location, dropoff_location, vehicleType } = req.body;
    try {
        // now we will create the ride
        const ride = await rideService.createRide(
            {
                userId: req.user._id,
                pickup_location,
                dropoff_location,
                vehicleType
            }
        );
        // populate the user details
        const rideWithUser = await Ride.findById(ride._id).populate('user');

        const pickup_cordinates = await mapService.getAddressCorrdinate(pickup_location);
        console.log(pickup_cordinates);

        const dropoff_cordinates = await mapService.getAddressCorrdinate(dropoff_location);
        console.log(dropoff_cordinates);

        const captainsInRadius = await mapService.getCaptainsInRadius(
            pickup_cordinates.lat,
            pickup_cordinates.lng,
            500
        );

        console.log("Captains in radius:", captainsInRadius.length);

        // Hide OTP in response
        const rideWithHiddenOtp = rideWithUser.toObject();
        delete rideWithHiddenOtp.otp;

        captainsInRadius.map(captain => {
            sendMessageToSocket(captain.socketId, {
                event: "new-ride",
                data: rideWithHiddenOtp
            })
        })

        res.status(201).json({
            success: true,
            message: "Ride created successfully",
            ride: rideWithHiddenOtp
        });

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
// now in the app.js


// now weill create another controller for creating the fare of the ride
module.exports.getFare = async (req, res) => {
    // get the errors
    const errors = validationResult(req);
    // if there are any error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // get the details from the query
        const { pickup_location, dropoff_location } = req.query;
        // now we will get the fare
        const fare = await rideService.getFare(pickup_location, dropoff_location);
        // now we will send the response
        res.status(200).json({
            success: true,
            message: "Fare calculated successfully",
            fare
        });
        console.log(fare);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// now we will create another controller for confirming the ride
module.exports.confirmRide = async (req, res) => {
    // get the errors
    const errors = validationResult(req);
    // if there are any error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // get the details from the body
        const { rideId } = req.body;
        // now we will confirm the ride
        const ride = await rideService.confirmRide(rideId);
        sendMessageToSocket(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        })
        // now we will send the response
        res.status(200).json({
            success: true,
            message: "Ride confirmed successfully",
            ride
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
// start ride controller
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        sendMessageToSocket(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// end ride controller
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocket(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json({
            success: true,
            message: "Ride ended successfully",
            ride
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// cancel ride controller
module.exports.cancelRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // Determine user type and ID
        const userType = req.user ? 'user' : 'captain';
        const userId = req.user ? req.user._id : req.captain._id;

        const ride = await rideService.cancelRide({ rideId, userId, userType });

        // Notify the other party
        if (userType === 'user' && ride.captain && ride.captain.socketId) {
            sendMessageToSocket(ride.captain.socketId, {
                event: 'ride-cancelled',
                data: ride
            });
        } else if (userType === 'captain' && ride.user && ride.user.socketId) {
            sendMessageToSocket(ride.user.socketId, {
                event: 'ride-cancelled',
                data: ride
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ride cancelled successfully",
            ride
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// get ride history controller
module.exports.getRideHistory = async (req, res) => {
    try {
        let rides;

        if (req.user) {
            // User's ride history
            rides = await rideService.getRidesByUser(req.user._id);
        } else if (req.captain) {
            // Captain's ride history
            rides = await rideService.getRidesByCaptain(req.captain._id);
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return res.status(200).json({
            success: true,
            rides
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports.getCaptainStats = async (req, res) => {
    try {
        const stats = await rideService.getCaptainStats(req.captain._id);
        return res.status(200).json({
            success: true,
            stats
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
