// this is the ride model
// when the user book the ride then we will store the data here
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    // now the user who creates the ride
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain'
    },
    // now the pickup location
    pickup_location: {
        type: String,
        required: true
    },
    // now the dropoff location
    dropoff_location: {
        type: String,
        required: true
    },
    // now the fare
    fare: {
        type: Number,
        required: true,
    },
    // status of the ride
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number,
        //required : true
    },
    distance: {
        type: Number,
        //required : true
    },
    paymentId: {
        type: String,
        //required : true
    },
    orderId: {
        type: String,
        //required : true
    },
    signature: {
        type: String,
        //required : true
    },
    otp:
    {
        type: String,
        select: false,
        required: true
    }
    // now we will go to ride service

})

const Ride = mongoose.model('ride', rideSchema);

module.exports = Ride;
// now we wll create the services