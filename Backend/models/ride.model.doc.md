# Ride Model Documentation (`ride.model.js`)

## Overview
This file defines the **Database Schema** for a Trip (Ride). It links a User, a Captain, and the Locations.

## Schema Fields

- **user**: The ID of the passenger (User).
- **captain**: The ID of the driver (Captain).
- **pickup_location**: Text address of pickup.
- **dropoff_location**: Text address of dropoff.
- **fare**: The calculated cost of the trip.
- **status**: Current state of the ride:
  - 'pending': Requested, waiting for driver.
  - 'accepted': Driver is on the way.
  - 'ongoing': Trip in progress.
  - 'completed': Trip finished.
  - 'cancelled': Trip cancelled.
- **otp**: A 4-digit code the user gives to the captain to start the ride. `select: false` (hidden by default).
- **duration**: Time taken (in seconds).
- **distance**: Distance covered (in meters).
