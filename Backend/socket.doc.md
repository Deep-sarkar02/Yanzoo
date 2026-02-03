# Socket Documentation (`socket.js`)

## Overview
This file manages **Real-Time Communication**. It allows the server to send messages instantly to the User or Captain without them refreshing the page (e.g., "Ride Accepted", "Driver Location").

## Code Explanation

### 1. Initialization
```javascript
function initialiseSocket(server) {
    io = socketIo(server, { cors: { origin: '*' } });
}
```
- Creates the Socket.IO instance and attaches it to the HTTP server.
- **cors: { origin: '*' }**: Allows connections from anywhere (for development).

### 2. Handling Connections
```javascript
io.on('connection', (socket) => { ... })
```
- This function runs every time a new user/captain connects via socket.

### 3. Joining Events
```javascript
socket.on('join', async (data) => { ... })
```
- When a user logs in, they send a 'join' event.
- We update their record in the database (`userModel` or `captainModel`) with their new `socketId`.
- This `socketId` is like a phone number; we need it to send messages specifically to *them*.

### 4. Location Updates
```javascript
socket.on('update-location-captain', async (data) => { ... })
```
- Captains' phones send this event every few seconds.
- We update the captain's location in the database so we know where they are.

### 5. Ride Events
```javascript
socket.on('confirm-ride', ...)
```
- When a captain accepts a ride, this event is triggered.
- We verify the user details and send a `ride-confirmed` message BACK to the user.

### 6. Sending Messages
```javascript
function sendMessageToSocket(socketId, messageObject) {
    io.to(socketId).emit(...)
}
```
- A helper function used by other parts of the app (like controllers) to send a message to a specific person using their `socketId`.
