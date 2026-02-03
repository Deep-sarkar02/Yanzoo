# Map Controller Documentation (`map.controller.js`)

## Overview
This file handles calls related to **Geolocation and Maps**. It serves as an interface between the Frontend and the `maps.service.js` (which likely calls Google Maps API).

## Functions

### 1. `getCordinates`
- **What it does**: Converts an address (text) into coordinates (Latitude/Longitude).
- **Usage**: Used when a user types a pickup address, so we know where to place the pin on the map.

### 2. `getDistanceTime`
- **What it does**: Calculates the distance (km) and travel time (minutes) between two locations.
- **Usage**: Used to calculate the Fare and showing "ETA" (Estimated Time of Arrival).

### 3. `getSuggestion`
- **What it does**: Provides autocomplete suggestions as the user types an address.
- **Usage**: When you type "Airp" it suggests "Airport, Terminal 1", etc.
