// step :  46 : create the user logout page
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UserLogout = () => {

    // here first get the toekn and pass to the backend to logout the user
    // then send the response to the frontend
    // now we will get the token from the local storage
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }).catch(err => {
            console.error(err);
            // Even if it fails, we might want to clear local storage and redirect
            localStorage.removeItem('token');
            navigate('/login');
        });
    }, [token, navigate]);

    return (
        <div>
            <h1>User Logout Page</h1>
        </div>
    );
}
export default UserLogout;
