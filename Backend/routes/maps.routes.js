const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const mapController = require("../controllers/map.controller.js");
const { query } = require("express-validator");

router.get("/get-cordinate",
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authuser,
    mapController.getCordinates
);

router.get("/get-distance-time",
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authuser,
    mapController.getDistanceTime
);

router.get("/get-suggestion",
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authuser,
    mapController.getSuggestion
)

module.exports = router;