import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL);
const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

    }, []);

    const sendMessage = (eventName, message) => {
        console.log(`sending message :${message} to ${eventName}`);
        socket.emit(eventName, message);
    };
    const receiveMessage = (eventName, callback) => {
        console.log(`receiving message :${eventName}`);
        socket.on(eventName, callback);
    };
    // return 
    return (
        <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
