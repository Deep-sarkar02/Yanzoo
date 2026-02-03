# User Model Documentation (`user.model.js`)

## Overview
This file defines the **Database Schema** for the Rider (User). It tells MongoDB what information to store for each user.

## Schema Fields

- **fullname**: Object containing:
  - `firstname`: Required, min 3 chars.
  - `lastname`: Optional, min 3 chars.
- **email**: The unique identifier for the user. Required.
- **password**: The user's password. It is stored as a "hash" (scrambled), not plain text. Note: `select: false` means it won't be returned in queries by default (for security).
- **socketId**: Stores the connection ID for real-time tracking.

## Methods

### 1. `generateAuthToken`
- **What it does**: Creates a JWT (JSON Web Token).
- **Usage**: When a user logs in, this token is given to them. It's like a digital ID card they show with every request to prove who they are.

### 2. `comparePassword`
- **What it does**: Checks if a entered password matches the stored hashed password.
- **Usage**: Used during Login.

### 3. `hashPassword` (Static)
- **What it does**: Scrambles a password before saving it to the database.
- **Usage**: Used during Registration.
