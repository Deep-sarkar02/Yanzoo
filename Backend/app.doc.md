# App Documentation (`app.js`)

## Overview
This file configures the Express application. It sets up "middleware" (helpers that process requests) and connects the routes (URL paths) to logic.

## Code Explanation

### 1. Setup
```javascript
const express = require("express")
const app = express();
const dotenv = require("dotenv"); dotenv.config();
const cors = require("cors");
```
- **express**: The framework used to build the web server.
- **dotenv**: Loads secret keys (like database passwords) from the `.env` file.
- **cors**: "Cross-Origin Resource Sharing". It allows our Frontend (running on a different port) to talk to this Backend.

### 2. Database Connection
```javascript
const connectToDb = require("./db/db");
connectToDb();
```
- Imports and runs the function that connects to MongoDB.

### 3. Middleware
```javascript
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
- **cookieParser**: Helps read cookies from user requests (used for authentication).
- **express.json()**: Allows the server to understand JSON data sent in requests (like when you send a signup form).

### 4. Routes
```javascript
app.use('/users', userroutes)
app.use('/captains', captainroutes)
app.use('/maps', mapsRoute)
app.use('/rides', rideRoutes)
```
- These lines tell the app: "If a request starts with `/users`, send it to `user.routes.js` to handle."
- This keeps the code organized by feature (User, Captain, Map, Ride).

### 5. Export
```javascript
module.exports = app;
```
- We export this configured `app` so `server.js` can use it to start the server.
