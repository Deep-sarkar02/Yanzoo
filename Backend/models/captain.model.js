// here we will  cretae the authentication for the captain
// we will create the captain model
// require the mongoose




//======================step:-11======================
// now we will create the captain model
// we will create the captain model



const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// create the schema for the captain
const captainschema = new mongoose.Schema({
    // all the properties of the users will also be in the captain
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "first name must be of 3 charecter"]
        },
        lastname:
        {
            type: String,
            minlength: [3, "last name must be of 3 charecter"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // make the email lowercase
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],

    },
    password: {
        type: String,
        required: true,
        select: false // we will not show the password in the response
    },
    // here we will use socket id
    // use this for live tracking of the captain
    socketId: {
        type: String
    },
    // here we will use the role of the captain
    // we can add the avialability of the captain
    status: {
        type: String,
        enum: ['active', 'inactive'], // the status of the captain
        default: 'inactive' // by default the captain will be active
    },

    // here will be vehicle details
    vehicle: {
        color:
        {
            type: String,
            required: true,
            minlength: [3, "Color must be of 3 charecter"]
        },
        plate:
        {
            type: String,
            required: true,
            minlength: [3, "Plate must be of 3 charecter"]
        },
        capacity:
        {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        type: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto',], // the type of vehicle
            default: 'car' // by default the vehicle will be car
        }
    },
    // here we will use the location of the captain
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    }

})

captainschema.index({ location: '2dsphere' });

//some of the common methods
// now we will create a jwt token from the

// we will create a method to generate the token
captainschema.methods.generateAuthToken = function () {
    // generate the token
    // step -12
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // 24 hours   
    return token;
}

// compare the password
captainschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)

}

// hash the password
captainschema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


// create the captain model
const captainmodel = mongoose.model("captain", captainschema);

// export it
module.exports = captainmodel;
