const crypto = require("crypto");
// require the model
const Ride = require("../models/ride.model");
// get the map service so that we can get the  dist between the 2 plcase
const mapService = require("../services/maps.service");
// nwo we will create 2 service 
// create ride 
// get Fare
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }
    // get the distance and time
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // now we will have to create the fare
    // now we will calcuate  the faare for the auto , car , bike 
    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };
    const perKmFare = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };
    const perMinFare = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };
    // Use .value (meters/seconds) for calculation:
    const fare = {
        auto: Math.round(baseFare.auto + (distanceTime.distance.value / 1000 * perKmFare.auto) + (distanceTime.duration.value / 60 * perMinFare.auto)),
        car: Math.round(baseFare.car + (distanceTime.distance.value / 1000 * perKmFare.car) + (distanceTime.duration.value / 60 * perMinFare.car)),
        motorcycle: Math.round(baseFare.motorcycle + (distanceTime.distance.value / 1000 * perKmFare.motorcycle) + (distanceTime.duration.value / 60 * perMinFare.motorcycle))
    };
    return fare;
}
// otp function 
function genOtp(num) {
    function generateOTP(num) {
        // use crypto for otp generation and give no. of digits eqiual to num
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOTP(num);
}
// now we will pass the otp in the rides model


// create ride function 
module.exports.createRide = async ({ userId, pickup_location, dropoff_location, vehicleType }) => {
    // if anything is absent then throw an error
    if (!userId || !pickup_location || !dropoff_location || !vehicleType) {
        throw new Error("User id, pickup, destination and vehicle type are required");
    }

    // get the fare
    const fare = await getFare(pickup_location, dropoff_location);

    // create the ride
    const ride = await Ride.create({
        user: userId,
        pickup_location: pickup_location,
        dropoff_location: dropoff_location,
        otp: genOtp(4),
        fare: fare[vehicleType],

    });
    return ride;
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error("Ride id is required");
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await Ride.findById(rideId).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error("Ride not found");
    }

    return ride;
}
// now we will create the ride controller
// export the get fare function 
module.exports.getFare = getFare;

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error("Ride id and otp are required");
    }

    const ride = await Ride.findById(rideId).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== 'accepted') {
        throw new Error("Ride not accepted");
    }

    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("Ride id is required");
    }

    const ride = await Ride.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain');

    if (!ride) {
        throw new Error("Ride not found or you are not authorized to end this ride");
    }

    if (ride.status !== 'ongoing') {
        throw new Error("Ride is not ongoing");
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    });

    const updatedRide = await Ride.findById(rideId).populate('user').populate('captain');
    return updatedRide;
}

module.exports.cancelRide = async ({ rideId, userId, userType }) => {
    if (!rideId) {
        throw new Error("Ride id is required");
    }

    const ride = await Ride.findById(rideId).populate('user').populate('captain');

    if (!ride) {
        throw new Error("Ride not found");
    }

    // Only allow cancellation if ride is pending or accepted
    if (ride.status !== 'pending' && ride.status !== 'accepted') {
        throw new Error("Cannot cancel ride in current status");
    }

    // Verify authorization
    if (userType === 'user' && ride.user._id.toString() !== userId.toString()) {
        throw new Error("Not authorized to cancel this ride");
    }
    if (userType === 'captain' && ride.captain && ride.captain._id.toString() !== userId.toString()) {
        throw new Error("Not authorized to cancel this ride");
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'cancelled'
    });

    const updatedRide = await Ride.findById(rideId).populate('user').populate('captain');
    return updatedRide;
}

module.exports.getRidesByUser = async (userId) => {
    const rides = await Ride.find({ user: userId })
        .populate('captain')
        .sort({ createdAt: -1 });
    return rides;
}

module.exports.getRidesByCaptain = async (captainId) => {
    const rides = await Ride.find({ captain: captainId })
        .populate('user')
        .sort({ createdAt: -1 });
    return rides;
}

module.exports.getCaptainStats = async (captainId) => {
    const rides = await Ride.find({
        captain: captainId,
        status: 'completed'
    });

    const stats = rides.reduce((acc, ride) => {
        acc.earnings += ride.fare || 0;
        acc.distance += ride.distance || 0;
        acc.duration += ride.duration || 0;
        acc.count += 1;
        return acc;
    }, { earnings: 0, distance: 0, duration: 0, count: 0 });

    return stats;
}
// now we will go to controller

