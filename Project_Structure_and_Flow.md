# Project Structure and Flow Documentation

## 1. Project Overview
This project is a full-stack Uber Clone application consisting of:
- **Frontend**: A React application (using Vite) for the user interface (Riders and Captains).
- **Backend**: A Node.js/Express server handling core logic, database interactions, and real-time communication.
- **Database**: MongoDB for storing users, captains, rides, and logs.
- **Real-time Engine**: Socket.IO for live location tracking and ride updates.

## 2. System Flow Diagram

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

## 3. Frontend Routes (React Router)

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

## 4. Backend API Routes

Base URL: `http://localhost:4000` (typically)

### User Routes (`/users`)
| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register a new user | Validation |
| POST | `/login` | User login | Validation |
| GET | `/profile` | Get user profile | `authUser` |
| GET | `/logout` | Logout user (blacklist token) | `authUser` |

### Captain Routes (`/captains`)
| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register a new captain | Validation |
| POST | `/login` | Captain login | Validation |
| GET | `/profile` | Get captain profile | `authCaptain` |
| GET | `/logout` | Logout captain | `authCaptain` |

### Map Routes (`/maps`)
| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| GET | `/get-cordinate` | Get lat/lng for an address | `authUser` |
| GET | `/get-distance-time` | Calc distance/time between 2 points | `authUser` |
| GET | `/get-suggestion` | Autocomplete suggestions | `authUser` |

### Ride Routes (`/rides`)
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

## 5. Key File Connections

- **`server.js`**: (Entry Point) Creates the HTTP server and initializes Socket.IO.
- **`app.js`**: (Express App) Configures middlewares, routes, and CORS.
- **`socket.js`**: (Real-time) Manages WebSocket connections, events (`new-ride`, `ride-confirmed`), and updates.
- **`db/db.js`**: (Database) Connects to MongoDB.

### Data Flow Example (Creating a Ride)
1. **Frontend**: `Home.jsx` calls `createRide()` -> sends POST to `/rides/create-ride`.
2. **Backend Route**: `rides.routes.js` validates input -> calls `rideController.createRide`.
3. **Controller**: `ride.controller.js` calls `rideService.createRide`.
4. **Service**: `ride.service.js` calculates fare, saves Ride to DB.
5. **Controller (cont.)**: Fetches nearby captains via `mapService`.
6. **Socket**: `sendMessageToSocket` triggers `new-ride` event to specific captains.
7. **Frontend**: Captain's `CaptainHome.jsx` receives `new-ride` socket event -> shows Popup.
