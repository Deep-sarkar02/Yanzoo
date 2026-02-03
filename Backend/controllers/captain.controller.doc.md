# Captain Controller Documentation (`captain.controller.js`)

## Overview
This file handles **Captain (Driver) operations**. It is very similar to the User Controller but works with the `Captain` database model.

## Functions

### 1. `registerCaptain`
- **What it does**: Registers a new driver.
- **Steps**:
  1. Validates inputs (email, vehicle details, etc.).
  2. Checks if the captain already exists.
  3. Hashes the password.
  4. Calls `captainService.createCaptain` to save the captain AND their vehicle details to the database.
  5. Generates an auth token and sends it back.

### 2. `loginCaptain`
- **What it does**: Logs in a driver.
- **Steps**:
  1. Finds the captain by email.
  2. Verifies the password.
  3. Generates a token and sets it in a cookie.

### 3. `getCaptainProfile`
- **What it does**: Returns the logged-in captain's profile.
- **Steps**:
  1. Sends back the `req.captain` data (populated by middleware).

### 4. `logoutCaptain`
- **What it does**: Logs the captain out.
- **Steps**:
  1. Blacklists the current token.
  2. Clears the cookie.
