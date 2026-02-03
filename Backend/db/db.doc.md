# Database Documentation (`db/db.js`)

## Overview
This file handles the connection to the MongoDB database.

## Code Explanation

### 1. Helper Function
```javascript
function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => { console.log("connceted to db") })
        .catch(err => console.log(err))
}
```
- **mongoose**: A library that makes interacting with MongoDB easier.
- **mongoose.connect**: Tries to connect using the URL stored in `process.env.DB_CONNECT`.
- **.then()**: If connection is successful, it logs "connected to db".
- **.catch()**: If it fails, it logs the error.

### 2. Export
```javascript
module.exports = connectToDb;
```
- Exports the function so `app.js` can call it when the server starts.
