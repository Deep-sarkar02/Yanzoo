# User Controller Documentation (`user.controller.js`)

## Overview
This file contains the logic for **User (Rider) operations** like registering, logging in, getting profile, and logging out. It acts as the "middleman" between the Route (URL) and the Database.

## Functions

### 1. `registeruser`
- **What it does**: Creates a new rider account.
- **Steps**:
  1. Checks for validation errors (like invalid email).
  2. Checks if a user with this email already exists in the database.
  3. Hashes the password (scrambles it for security).
  4. Calls `userService.createUser` to save the new user to the database.
  5. Generates a secure token (JWT) so the user stays logged in.
  6. Sends back the new user data and the token.

### 2. `loginuser`
- **What it does**: Logs in an existing rider.
- **Steps**:
  1. Checks if the email exists in the database.
  2. Compares the entered password with the hashed password in the database.
  3. If correct, generates a token.
  4. Sets the token in a cookie (for browser persistence) and sends it in the response.

### 3. `getprofile`
- **What it does**: Fetches the logged-in user's details.
- **Steps**:
  1. Returns the user data attached to the request (which was added by the `authMiddleware` before this function ran).

### 4. `logoutuser`
- **What it does**: Logs the user out.
- **Steps**:
  1. Clears the auth cookie.
  2. Adds the current token to a "Blacklist" database table so it can't be used again.
  3. Sends a success message.
