//=====================step - 5========================
// requaremmnent section
const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model'); // require the blacklist model
const captainmodel = require('../models/captain.model');
// create a middleware to check the user is authenticated or not
module.exports.authuser = async (req, res, next) => {
    // now we need the token 
    // token can vbe found in the header or the cookeies
    //Optional Chaining (?.): It first checks if req.headers.authorization exists. If it doesn't, the expression returns undefined instead of throwing an error
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // now get the token from any one of the place
    console.log("authuser token:", token);

    // check if the token is present or not
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // now we will check if the token is blacklisted or not
    // require the blacklisted model
    const isblaclisted = await blacklistTokenModel.findOne({ token: token }); // check if the token is present in the blacklisted model
    // if it is bl then  send the response
    if (isblaclisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }




    // now we will decreyt the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token with the secret key
        console.log("Decoded token:", decoded);

        // now we will get the user from the database
        const user = await usermodel.findById(decoded._id); // we will only get the id 
        console.log("User found:", user ? user._id : "null");

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }


        // after the user wwe have got
        // set it to req,user
        req.user = user; // now we can access the user in the next middleware or controller
        // now return the next middleware or controller
        return next();
    }

    catch (error) {
        console.log("authuser error:", error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

//=====================step - 18========================
//create a amiddleware to authorise the captain

module.exports.authCaptain = async (req, res, next) => {
    // get the token from the request
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // chek the token is present or not


    // check if the token is present or not
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // check if the token is blacklisted or not
    const isblaclisted = await blacklistTokenModel.findOne({ token: token });
    console.log(isblaclisted);
    // if it is bl then  send the response
    if (isblaclisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // now we will decreyt the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token with the secret key
        console.log(decoded);
        // now we will get the captain from the database
        const captain = await captainmodel.findById(decoded._id); // we will only get the id

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // check if the user is captain or not
        req.captain = captain; // now we can access the captain in the next middleware or controller
        // now return the next middleware or controller
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// Middleware to allow both user and captain
module.exports.authUserOrCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Try to find as user first
        const user = await usermodel.findById(decoded._id);
        if (user) {
            req.user = user;
            return next();
        }

        // If not user, try captain
        const captain = await captainmodel.findById(decoded._id);
        if (captain) {
            req.captain = captain;
            return next();
        }

        return res.status(401).json({ message: 'Unauthorized' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}