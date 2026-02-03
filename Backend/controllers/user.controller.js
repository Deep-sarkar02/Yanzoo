// this is the controller of the usermodel
const { validationResult } = require("express-validator")
const usermodel = require("../models/user.model")
// now we can create some api
const userservice = require('../services/user.service')
//require  the validation result from the express validator
//const{validationResult} = require('express-validator')



// exports
// =======================register controller========================
// now we will create the register user function
module.exports.registeruser = async (req, res, next) => {
    try {
        // now we will write the logic to create the user
        // create a new folder services and unde that a new file user.service.js



        // now after the requirement create the function
        const errors = validationResult(req); // if the erroe is there
        // check the errors
        if (!errors.isEmpty()) {
            // if there is  error then we will return 400 status
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() })
        }

        console.log("hello")
        console.log(req.body)
        // if all these are okey
        // require all the data from the re.body
        const { fullname, email, password } = req.body;


        // now we will check if the user with this email already exists or not
        const existinguser = await usermodel.findOne({ email });
        // if the user already exists then we will return 400 status
        if (existinguser) {
            // user already exists
            console.log('User already exists with email:', email);
            return res.status(400).json({ message: "User with this email already exists" })
        }


        // now hash the password
        console.log('Hashing password...');
        const h_pass = await usermodel.hashPassword(password);
        console.log('Password hashed successfully');



        // now we will call the userservice and also register the user 
        console.log('Creating user...');
        const user = await userservice.createuser(
            {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
                email,
                password: h_pass
            }
        )
        console.log('User created:', user);

        // now we need to geenrate the token for the user model
        const token = user.generateAuthToken();
        console.log('Token generated, sending response');
        // afet the token we will pass the token and t the user model which has been created now
        res.status(201).json({ token, user })
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}




// =======================login controller========================
// ========================step 2=========================
module.exports.loginuser = async (req, res, next) => {
    // now we will write the logic to login the user
    // first we will check the validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // now we will get the email and password from the req.body
    const { email, password } = req.body;
    //now we will check that if any user with this email exists or not
    //select('+password') --> means that password will not be shown in the response
    const user = await usermodel.findOne({ email }).select('+password');


    // if user does not exist then we will return 400 status
    if (!user) {
        // user does not exist
        return res.status(401).json({ message: "Invalid email or password" })
    }
    // check the password
    // compare the password --> it is the fucntion which we have created in the user.model.js
    const isMatch = await user.comparePassword(password);
    // if the password does not match then we will return 401 status
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" })
    }
    // if the password matches then we will generate the token
    const token = user.generateAuthToken();

    // now we will set the token in the cookie
    res.cookie('token', token)
    //now  if we send the token in the cokkie then we can send the response with out the help of  the header






    // now we will return the token and the user and send the response
    res.status(200).json({ token, user });

}



// =======================get profile controller========================
// ========================step 4=========================
// now we will create the get profile controller
module.exports.getprofile = async (req, res, next) => {

    /*concept of middleware
    // here we need a middleware--> if any user is logged in then we will get the user from the req.user
    // if the user is not logged in then we will return 401 status so we need midddleware*/

    // create middleware folder in the backend and under that create a new file auth.middleware.js
    // step 5 in the middleware folder 





    // now we will return the user
    res.status(200).json(req.user);
}



// =======================logout controller========================
// ========================step 10=========================
// require the blaclisted model
const blacklistedmodel = require('../models/blacklistToken.model');

module.exports.logoutuser = async (req, res, next) => {


    // now we will clear the cookie
    res.clearCookie('token'); // clear the token from the cookie

    // get the token from the cookie or the header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // now get the token from any one of the place

    // now we will add the token to the blacklisted model
    await blacklistedmodel.create({ token }); // create a new document in the blacklisted model

    // now we will return the response
    res.status(200).json({ message: "User logged out successfully" });
}
