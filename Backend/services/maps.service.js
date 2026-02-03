const axios = require("axios");
// get the captain model
// const Captain = require("../models/captain.model");
const captainmodel = require("../models/captain.model");

module.exports.getAddressCorrdinate = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;
    try {
        const res = await axios.get(url);
        if (res.data.status === "OK") {
            const location = res.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error("Invalid address or geocoding failed");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;

    try {
        const res = await axios.get(url);
        if (res.data.status === "OK") {
            const element = res.data.rows[0].elements[0];
            if (element.status === "ZERO_RESULTS") {
                throw new Error("No routes found between locations");
            }
            return {
                distance: element.distance,
                duration: element.duration
            };
        } else {
            throw new Error("Failed to fetch distance and time");
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Input is required");
    }

    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apikey}`;

    try {
        const res = await axios.get(url);
        if (res.data.status === "OK") {
            return res.data.predictions;
        } else if (res.data.status === "ZERO_RESULTS") {
            return []; // Return empty array instead of throwing error
        } else {
            throw new Error("Failed to get suggestions");
        }
    } catch (err) {
        console.error("Error in getAutoCompleteSuggestions:", err.message);
        throw err;
    }
};
// get the captian sin the redius
module.exports.getCaptainsInRadius = async (lat, lng, radius) => {
    const captains = await captainmodel.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat],
                    radius / 6371 // Convert radius from miles to radians
                ]
            }
        }
    });
    return captains;
};
