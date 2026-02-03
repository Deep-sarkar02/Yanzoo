# Captain Model Documentation (`captain.model.js`)

## Overview
This file defines the **Database Schema** for the Driver (Captain). It includes personal details AND vehicle details.

## Schema Fields

- **fullname**: First and Last name.
- **email**: Unique email address.
- **password**: Hashed password.
- **socketId**: For real-time tracking.
- **status**: 'active' or 'inactive'.
- **vehicle**: Object containing:
  - `color`, `plate`, `capacity`.
  - `type`: 'car', 'motorcycle', or 'auto'.
- **location**:
  - `lat`: Latitude.
  - `lng`: Longitude.
  - Note: This uses a special "2dsphere" index which allows us to search for "captains near me".

## Methods

### 1. `generateAuthToken`
- Generates a secure JWT for the captain.

### 2. `comparePassword`
- Verifies password during login.

### 3. `hashPassword`
- Scrambles password during registration.
