import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/Usercontext'
import CaptainContextProvider from './context/CaptainContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CaptainContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CaptainContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
