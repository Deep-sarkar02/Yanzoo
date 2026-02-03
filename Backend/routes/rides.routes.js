const express = require("express");
const router = express.Router();
// we need a validator
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
// for the auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
// now we will create a create route for the rides
// for creating the id we need the id of the user , the pickup location , the dropoff location 
router.post('/create-ride',
    // auth middleware
    authMiddleware.authuser,
    //  we will check some few cetails
    //body('userId').isString().isLength({ min: 24, max: 24 }).withMessage("Invalid user id"), // if the min and the max length is not same then it will throw an error
    body('pickup_location').isString().isLength({ min: 3 }).withMessage("Invalid pickup location"),
    body('dropoff_location').isString().isLength({ min: 3 }).withMessage("Invalid dropoff location"),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage("Invalid vehicle type"),
    // now we will pass it to the controller
    rideController.createRide,

)
// now we will create a get fare route
router.get('/get-fare', authMiddleware.authuser,
    // now we will check the pickup location
    query('pickup_location')
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid pickup location"),
    // now we will check the dropoff location
    query('dropoff_location')
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid dropoff location"),
    rideController.getFare);

// post confirm ride
router.post('/confirm-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    // body('otp').isNumeric().withMessage("Invalid otp"),
    rideController.confirmRide);

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
    rideController.startRide
)

// end ride route
router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

// cancel ride route - accessible by both users and captains
router.post('/cancel-ride',
    authMiddleware.authUserOrCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.cancelRide
)

// get ride history - accessible by both users and captains
router.get('/ride-history',
    authMiddleware.authUserOrCaptain,
    rideController.getRideHistory
)

router.get('/captain-stats',
    authMiddleware.authCaptain,
    rideController.getCaptainStats
)

module.exports = router;