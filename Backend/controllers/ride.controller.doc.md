# Ride Controller Documentation (`ride.controller.js`)

## Overview
This is the core logic for the **Ride Sharing** functionality. It handles creating, confirming, starting, and ending rides.

## Functions

### 1. `createRide`
- **What it does**: Initiates a new ride request from a user.
- **Logic**:
  1. Calculates the distance/time between pickup and dropoff.
  2. Finds captains within a 500m radius using `mapService.getCaptainsInRadius`.
  3. Creates a Ride entry in the database.
  4. **Critical**: Uses `sendMessageToSocket` to send a 'new-ride' alert to all nearby captains instantly.

### 2. `getFare`
- **What it does**: Calculates how much a ride will cost.
- **Logic**: Calls `rideService.getFare` which uses base fare + distance + time math for different vehicle types (Auto, Car, Moto).

### 3. `confirmRide`
- **What it does**: Called when a Captain accepts a ride.
- **Logic**:
  1. Updates the Ride status to 'accepted'.
  2. Notifies the User via Socket.IO (`ride-confirmed`) that a driver is on the way.

### 4. `startRide`
- **What it does**: Called when the Captain picks up the user and enters the OTP.
- **Logic**:
  1. Verifies the OTP provided by the user.
  2. Updates Ride status to 'ongoing'.
  3. Notifies the User (`ride-started`).

### 5. `endRide`
- **What it does**: Called when the ride finishes.
- **Logic**:
  1. Updates Ride status to 'completed'.
  2. Notifies the User (`ride-ended`) so they see the payment/rating screen.

### 6. `cancelRide`
- **What it does**: Cancels an active or pending ride.
- **Logic**: Checks if the requestor (User or Captain) is allowed to cancel, then updates status to 'cancelled' and notifies the other party.
