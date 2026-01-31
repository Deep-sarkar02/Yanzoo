//step - 51
// captainprotectwrapper
//step  :-42 :- now we will create a user protect wrapper



// this will be a higher order component
// this will check if the user is logged in or not
// if the user is logged in then it will render the component
// if the user is not logged in then it will redirect to the login page
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }



        //  after the isLoading is false it means the user is logged in and we are valifdation the captain
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            // send the token in the header 
            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then(response => {
            if (response.status === 200) {
                // set the caption 
                setCaptain(response.data.captain);
                // set the isLoading to false
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
            // if the error occours in the token then remove the token and redirect to the login page
            localStorage.removeItem('token');
            navigate('/captain-login');
        });
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        // it means the user is not logged in and we are valifdation the captain
        return (
            <div>Loading...</div>
        );
    }

    return (
        <>
            {children}
        </>
    );
};

export default CaptainProtectWrapper;