# Complete Route Testing Guide (Hopscotch)

This document provides a comprehensive guide to testing all backend routes for the Uber Clone using **Hopscotch**.

---

## 🛠️ General Setup in Hopscotch
1.  **URL Base**: `http://localhost:4000`
2.  **Auth**: For protected routes, use **Authorization > Bearer Token** and paste the token received during login.

---

## 📍 Maps API Routes

### 1. Get Coordinates
*   **Endpoint**: `/maps/get-cordinate`
*   **Method**: `GET`
*   **Params**:
    *   `address`: `vit bhopal`
*   **Auth**: Bearer Token required.

### 2. Get Distance & Time
*   **Endpoint**: `/maps/get-distance-time`
*   **Method**: `GET`
*   **Params**:
    *   `origin`: `bhopal`
    *   `destination`: `indore`
*   **Auth**: Bearer Token required.

### 3. Get Suggestions (Autocomplete)
*   **Endpoint**: `/maps/get-suggestion`
*   **Method**: `GET`
*   **Params**:
    *   `input`: `vit bhopal`
*   **Auth**: Bearer Token required.

---

## 👤 User Routes

### 1. Register User
*   **Endpoint**: `/users/register`
*   **Method**: `POST`
*   **Body (JSON)**:
    ```json
    {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### 2. Login User
*   **Endpoint**: `/users/login`
*   **Method**: `POST`
*   **Body (JSON)**:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### 3. User Profile
*   **Endpoint**: `/users/profile`
*   **Method**: `GET`
*   **Auth**: Bearer Token required.

### 4. Logout User
*   **Endpoint**: `/users/logout`
*   **Method**: `GET`
*   **Auth**: Bearer Token required.

---

## 🚖 Captain Routes

### 1. Register Captain
*   **Endpoint**: `/captains/register`
*   **Method**: `POST`
*   **Body (JSON)**:
    ```json
    {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane@example.com",
      "password": "password123",
      "vehicle": {
        "color": "Black",
        "plate": "ABC-123",
        "capacity": 4,
        "type": "car"
      }
    }
    ```

### 2. Login Captain
*   **Endpoint**: `/captains/login`
*   **Method**: `POST`
*   **Body (JSON)**:
    ```json
    {
      "email": "jane@example.com",
      "password": "password123"
    }
    ```

### 3. Captain Profile
*   **Endpoint**: `/captains/profile`
*   **Method**: `GET`
*   **Auth**: Bearer Token required.

### 4. Logout Captain
*   **Endpoint**: `/captains/logout`
*   **Method**: `GET`
*   **Auth**: Bearer Token required.

---

## 🚗 Ride Routes

### 1. Create Ride
*   **Endpoint**: `/rides/create-ride`
*   **Method**: `POST`
*   **Auth**: Bearer Token required (User).
*   **Body (JSON)**:
    ```json
    {
      "pickup_location": "bhopal",
      "dropoff_location": "indore",
      "vehicleType": "car"
    }
    ```
    > [!NOTE]
    > `userId` is automatically extracted from the **Bearer Token**. You do not need to send it in the request body.
    > `vehicleType` must be one of: `auto`, `car`, `motorcycle`.

### Expected Response:
```json
{
  "success": true,
  "message": "Ride created successfully",
  "ride": {
    "user": "679c8828e109f086b976c697",
    "pickup_location": "bhopal",
    "dropoff_location": "indore",
    "fare": 1850,
    "status": "pending",
    "_id": "679c8e...",
    "__v": 0
  }
}
```

---

## 📡 Socket.IO Testing (Realtime)

To test the realtime features, use the **Realtime** tab in Hopscotch.

### 1. Connect to Socket Server
*   **Protocol**: `Socket.io`
*   **URL**: `http://localhost:4000`
*   **Path**: `/socket.io/` (default)
*   **Method**: Click **Connect**.

### 2. Verify Connection
*   Once connected, you should see a message in your Backend terminal: `New client connected [socket-id]`.
*   Hopscotch will show a "Connected" status.

### 3. Handle Events (Example)
*   To listen for messages sent via `sendMessageToSocket`:
    *   In the **Events** section of Hopscotch, you will automatically see incoming events if the backend emits them (e.g., `ride-started`, `new-ride`).
*   To emit messages from Hopscotch to Backend:
    *   Use the **Emit** section.
    *   **Event**: (e.g., `join-room`)
    *   **Data (JSON)**: `{"userId": "123"}`
