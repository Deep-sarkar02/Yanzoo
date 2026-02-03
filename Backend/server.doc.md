# Server Documentation (`server.js`)

## Overview
This file is the **entry point** of the Backend application. It starts the Node.js server and listens for incoming requests.

## Code Explanation

### 1. Imports
```javascript
const http = require("http")
const app = require("./app")
const { initialiseSocket } = require('./socket');
```
- we import the built-in `http` module to create a server.
- we import `app` from `app.js`, which handles all the logic (routes, middleware).
- we import `initialiseSocket` to set up real-time communication.

### 2. Port Configuration
```javascript
const port = process.env.PORT || 8080;
```
- We check if a specific port is defined in the environment variables (`.env`).
- If not, we default to port `8080`.

### 3. Server Creation
```javascript
const server = http.createServer(app);
```
- We create the server and tell it to use our `app` to handle requests.

### 4. Socket Initialization
```javascript
initialiseSocket(server);
```
- We attach the Socket.IO logic to our running server so it can handle real-time messages.

### 5. Start Listening
```javascript
server.listen(port, () => { console.log(...) })
```
- The server starts waiting for requests on the specified port.
- When it starts successfully, it prints a message to the console.
