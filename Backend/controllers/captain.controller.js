//==================captain controller========================
// now we will create the captain controller
//=========================step 12=========================


const blacklistTokenModel = require('../models/blacklistToken.model');
const captainmodel = require('../models/captain.model');
const captainservice = require('../services/captain.service');
const { validationResult } = require('express-validator');

// now we will create the register captain function
//========================register captain controller========================
module.exports.registerCaptain = async (req, res, next) => {
    try {
        // check the validation result
        const errors = validationResult(req);
        // if there is an error then return the error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // now we will get the data from the request body
        const { fullname, email, password, vehicle } = req.body;

        console.log('Registering captain:', { email, fullname });

        // now we will check if the email is already registered or not
        const existingCaptain = await captainmodel.findOne({ email });

        if (existingCaptain) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        //get the password
        const h_pass = await captainmodel.hashPassword(password);

        // now we will call the captain service to create the captain
        const captain = await captainservice.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: h_pass,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            type: vehicle.type
        });

        // now we will generate the token for the captain
        const token = captain.generateAuthToken();

        // now we will return the token and the captain
        res.status(201).json({ token, captain });
    } catch (error) {
        console.error('Error in registerCaptain:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


//========================login captain controller========================
//=======================step 17========================
module.exports.loginCaptain = async (req, res, next) => {
    // check the errors
    const errors = validationResult(req);
    // if there is an error then return the error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // now we will get the data from the request body
    const { email, password } = req.body;

    // now find the captain by email
    const captain = await captainmodel.findOne({ email }).select('+password');

    // if captain is not found then return the error
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // ese if the password is not matched then return the error
    const isMatch = await captain.comparePassword(password);
    // if the password is not matched then return the error
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    // if the password matches
    // generate the token for the captain
    const token = captain.generateAuthToken();
    // set the token in the cookie
    res.cookie('token', token);

    // return the token and the captain
    res.status(200).json({ token, captain });
}


//========================get captain profile controller========================
//=======================step 20========================
module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}


//========================logout captain controller========================
//=======================step 22========================
module.exports.logoutCaptain = async (req, res, next) => {

    // get the token from the request
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    //blacklist the token
    await blacklistTokenModel.create({ token });
    // clear the cookie
    res.clearCookie('token');
    // return the success message
    res.status(200).json({ message: 'Logged out successfully' });
}