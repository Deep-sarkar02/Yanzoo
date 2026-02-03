# 🚗 Yanzoo - Full Stack Ride Sharing Application

Yanzoo is a comprehensive ride-sharing application (a full-stack clone of Uber) built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Socket.IO for real-time capabilities. It features distinct interfaces for Riders (Users) and Drivers (Captains), simulating a complete transportation ecosystem.

## ✨ Features

### 👤 For Riders (Users)
- **User Authentication**: Secure Signup/Login with JWT.
- **Interactive Maps**: Real-time address searching, autocomplete, and route visualization using Google Maps API.
- **Ride Booking**: Choose vehicle types (**YanzooGo**, **Moto**, **Auto**) with instant fare estimates.
- **Live Tracking**: Track the driver's location in real-time on the map.
- **Ride Management**: Confirm bookings, view captain details, and complete rides with payments.

### 🚙 For Captains (Drivers)
- **Captain Authentication**: Dedicated registration with vehicle details.
- **Dynamic Dashboard**: View earnings, hours online, and trip statistics.
- **Ride Requests**: Receive real-time ride notifications via Popup with distance and fare details.
- **Ride Management**: Accept/Decline rides, verify passengers with OTP, and navigate to destinations.
- **Live Location Updates**: Automatically stream real-time location to the backend.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), React Router, GSAP (Animations), TailwindCSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Real-time**: Socket.IO (Bidirectional communication).
- **Maps**: Google Maps API (Geocoding, Autocomplete, Directions).
- **Security**: JWT (JSON Web Tokens), BCrypt (Password Hashing).

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- Google Maps API Key

### 1. Clone the Repository
```bash
git clone https://github.com/Deep-sarkar02/Yanzoo.git
cd Yanzoo
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=4000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API=your_google_maps_api_key
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
Start the frontend:
```bash
npm run dev
```

## 📜 Documentation & Project Structure

We have generated detailed documentation for the codebase. Check the `.doc.md` files located next to key source files in the `Backend` directory for beginner-friendly explanations of the code logic.

### System Flow Diagram

```mermaid
graph TD
    User[User / Rider] -->|HTTP Requests| FE[Frontend App (React)]
    Captain[Captain / Driver] -->|HTTP Requests| FE
    
    FE -->|API Calls (REST)| BE[Backend Server (Express)]
    FE -->|WebSocket Events| Socket[Socket.IO Service]
    
    subgraph Backend Services
        BE -->|Auth & Validation| Middleware[Middlewares]
        Middleware -->|Business Logic| Controllers[Controllers]
        Controllers -->|Data Access| Services[Services]
        Services -->|Query/Update| DB[(MongoDB)]
        
        Socket -->|Live Updates| FE
        Controllers -->|Trigger Events| Socket
    end
    
    Services -->|Map Calculations| Maps[Google Maps API / Mock Service]
```

### Frontend Routes (React Router)

These routes are defined in `frontend/src/App.jsx`.

| Path | Component | Description | Access |
| :--- | :--- | :--- | :--- |
| `/` | `Start` | Landing page / Splash screen | Public |
| `/login` | `UserLogin` | Rider login page | Public |
| `/signup` | `UserSignup` | Rider registration page | Public |
| `/home` | `Home` | **Main Rider Dashboard** (Map, Search, Book) | User (Protected) |
| `/riding` | `Riding` | Live ride tracking for User | User (Protected) |
| `/user/logout` | `UserLogout` | Logs out the user | User (Protected) |
| `/captain-login` | `CaptainLogin` | Driver login page | Public |
| `/captain-signup` | `CaptainSignup` | Driver registration page | Public |
| `/captain-home` | `CaptainHome` | **Main Driver Dashboard** (Online/Offline, Requests) | Captain (Protected) |
| `/captain-riding` | `CaptainRiding` | Live navigation for Driver | Captain (Protected) |
| `/captain/logout` | `CaptainLogout` | Logs out the captain | Captain (Protected) |

### Backend API Routes

Base URL: `http://localhost:4000` (typically)

#### User Routes (`/users`)
| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register a new user | Validation |
| POST | `/login` | User login | Validation |
| GET | `/profile` | Get user profile | `authUser` |
| GET | `/logout` | Logout user (blacklist token) | `authUser` |

#### Captain Routes (`/captains`)
| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register a new captain | Validation |
| POST | `/login` | Captain login | Validation |
| GET | `/profile` | Get captain profile | `authCaptain` |
| GET | `/logout` | Logout captain | `authCaptain` |

#### Map Routes (`/maps`)
| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| GET | `/get-cordinate` | Get lat/lng for an address | `authUser` |
| GET | `/get-distance-time` | Calc distance/time between 2 points | `authUser` |
| GET | `/get-suggestion` | Autocomplete suggestions | `authUser` |

#### Ride Routes (`/rides`)
| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| POST | `/create-ride` | Create a new ride request | `authUser` |
| GET | `/get-fare` | Estimate fare for a trip | `authUser` |
| POST | `/confirm-ride` | Captain accepts a ride | `authCaptain` |
| GET | `/start-ride` | Captain starts the trip (with OTP) | `authCaptain` |
| POST | `/end-ride` | Captain completes the trip | `authCaptain` |
| POST | `/cancel-ride` | Cancel a ride | `authUserOrCaptain` |
| GET | `/ride-history` | Get past rides | `authUserOrCaptain` |
| GET | `/captain-stats` | Get earnings/stats | `authCaptain` |

### Key File Connections

- **`server.js`**: (Entry Point) Creates the HTTP server and initializes Socket.IO.
- **`app.js`**: (Express App) Configures middlewares, routes, and CORS.
- **`socket.js`**: (Real-time) Manages WebSocket connections, events (`new-ride`, `ride-confirmed`), and updates.
- **`db/db.js`**: (Database) Connects to MongoDB.

#### Data Flow Example (Creating a Ride)
1. **Frontend**: `Home.jsx` calls `createRide()` -> sends POST to `/rides/create-ride`.
2. **Backend Route**: `rides.routes.js` validates input -> calls `rideController.createRide`.
3. **Controller**: `ride.controller.js` calls `rideService.createRide`.
4. **Service**: `ride.service.js` calculates fare, saves Ride to DB.
5. **Controller (cont.)**: Fetches nearby captains via `mapService`.
6. **Socket**: `sendMessageToSocket` triggers `new-ride` event to specific captains.
7. **Frontend**: Captain's `CaptainHome.jsx` receives `new-ride` socket event -> shows Popup.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---
**Yanzoo** - Moving the World, One Ride at a Time.
