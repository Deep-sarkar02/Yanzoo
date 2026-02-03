const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const cordinates = await mapsService.getAddressCorrdinate(address);
        res.status(200).json({
            success: true,
            cordinates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        const distanceTime = await mapsService.getDistanceTime(origin, destination);

        res.status(200).json({
            success: true,
            distanceTime
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

module.exports.getSuggestion = async (req, res, next) => {
    console.log("getSuggestion controller hit with query:", req.query);
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        const suggestion = await mapsService.getAutoCompleteSuggestions(input);

        res.status(200).json({
            success: true,
            suggestion
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}