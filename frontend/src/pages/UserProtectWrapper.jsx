//step  :-42 :- now we will create a user protect wrapper



// this will be a higher order component
// this will check if the user is logged in or not
// if the user is logged in then it will render the component
// if the user is not logged in then it will redirect to the login page
// it is quite same as the captain protect wrapper
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/Usercontext';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('user-token');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return; // Exit early if no token
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
            localStorage.removeItem('user-token');
            navigate('/login');
        });
    }, [token, navigate, setUser]); // Added navigate and setUser to dependency array

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    // If not loading and user data is available, render children
    // or if user is null after loading, it means redirection happened in useEffect
    if (!user) {
        return null; // Or a fallback, but useEffect should have navigated away
    }

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectWrapper;