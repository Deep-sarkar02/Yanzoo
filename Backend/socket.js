// here we will connect  the rider and the user with the same socket
const socketIo = require('socket.io');
// require the user and the captain model
const usermodel = require("./models/user.model")
const captainmodel = require("./models/captain.model")

let io;

function initialiseSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });


    // this is an event
    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            // data will be {userId : "" , role : ""}
            if (userType === "user") {
                await usermodel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if (userType === "captain") {
                await captainmodel.findByIdAndUpdate(userId, { socketId: socket.id });
                console.log(`Captain ${userId} joined with socketId ${socket.id}`);
            }
        })
        // now for the update location
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: "Invalid location" });
            }
            await captainmodel.findByIdAndUpdate(userId, {
                location: {
                    type: 'Point',
                    coordinates: [location.lng, location.lat]
                }
            });
            console.log(`Updated location for captain ${userId}: [${location.lng}, ${location.lat}]`);
        })

        socket.on('confirm-ride', async (data) => {
            const { rideId, captainId } = data;
            const rideService = require("./services/ride.service");
            const captainmodel = require("./models/captain.model");
            const captain = await captainmodel.findById(captainId);
            const ride = await rideService.confirmRide({ rideId, captain });

            // Populate user details to ensure socketId is available
            const rideWithUser = await require("./models/ride.model")
                .findById(ride._id)
                .populate('user');

            // Notify user
            if (rideWithUser && rideWithUser.user && rideWithUser.user.socketId) {
                sendMessageToSocket(rideWithUser.user.socketId, {
                    event: 'ride-confirmed',
                    data: rideWithUser
                });
            } else {
                console.log("User socket ID not found for ride:", rideId);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });
}

function sendMessageToSocket(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialised.');
    }
}

module.exports = { initialiseSocket, sendMessageToSocket };
