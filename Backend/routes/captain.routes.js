//===================step-13==================
// here we will create the routes for the captain
// require express
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');

// create a route to register the captain
router.post('/register', 
    [ 
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body('password').isLength({ min: 3 }).withMessage("Password must be at least 6 characters long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Vehicle color is required"),
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Vehicle model is required"),  
    //body('vehicle.number').notEmpty().withMessage("Vehicle number is required"),
    body('vehicle.type').isIn(['car' , 'motorcycle' , 'auto']).withMessage("Vehicle type is required"),
    body('vehicle.capacity')
    .isInt({ min: 1, max: 10 })
    .withMessage("Vehicle capacity must be a number between 1 and 10")
    ], 

    // now we will call the controller
     captainController.registerCaptain
);



//===================step-16==================
//cretae the route to login the captain
router.post('/login', 
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 3 }).withMessage("Password must be at least 6 characters long")
    ], 
    captainController.loginCaptain
);


//===================step-19==================
// create the route to get the captain profile
const authMiddleware = require('../middlewares/auth.middleware');
router.get('/profile',
    // we will use the middleware to check the token
    authMiddleware.authCaptain,
    captainController.getCaptainProfile
);



//===================step-21==================
//cretae a logout route for the captain
router.get('/logout',
    // we will use the middleware to check the token
    authMiddleware.authCaptain,
    captainController.logoutCaptain
);


module.exports = router;