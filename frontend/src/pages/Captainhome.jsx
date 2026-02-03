import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopup from "../Components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../Components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const Captainhome = () => {
    const { socket, sendMessage } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    const [RidepopupPanel, setRidepopupPanel] = useState(false); // initally it will be false
    const [ConfirmRidepopupPanel, setConfirmRidepopupPanel] = useState(false); // initally it will be true

    const [ride, setRide] = useState(null);

    useEffect(() => {
        if (!socket || !captain) return;

        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })

        // now for the update location
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    console.log({
                        userId: captain._id,
                        location: { lat: latitude, lng: longitude }
                    });
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: { lat: latitude, lng: longitude }
                    })
                })
            }
        }

        socket.on('new-ride', (data) => {
            console.log(data);
            setRide(data);
            setRidepopupPanel(true);
        })

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation(); // run once immediately

        return () => {
            clearInterval(locationInterval);
            socket.off('new-ride');
        }
    }, [captain, socket]);



    async function confirmRide() {
        // Emit socket event to backend
        socket.emit('confirm-ride', {
            rideId: ride._id,
            captainId: captain._id
        });

        setConfirmRidepopupPanel(true);
        setRidepopupPanel(false);
    }

    // use ref snippet
    // initally it will be null
    const RidepopupPanelRef = useRef(null);
    const ConfirmRidepopupPanelRef = useRef(null);
    // llogic to make the ride popup panel  true
    // cop[ied from the home.jsx
    useGSAP(function () {
        if (RidepopupPanel) {
            gsap.to(RidepopupPanelRef.current, {
                transform: "translateY(0)"
            })
        }
        else {// if it is false
            gsap.to(RidepopupPanelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [RidepopupPanel]) // dependencay will be the value of the ridepop up panel ie when the ride popuop will change then it will also chnage


    // logic to make the confirm ride popup panel true
    useGSAP(function () {
        if (ConfirmRidepopupPanel) {
            gsap.to(ConfirmRidepopupPanelRef.current, {
                transform: "translateY(0)"
            })
        }
        else {// if it is false
            gsap.to(ConfirmRidepopupPanelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [ConfirmRidepopupPanel]) // dependencay will be the value of the ridepop up panel ie when the ride popuop will change then it will also chnage
    // logics for the pop up ends

    // return statement
    return (
        // heer we will copy the ui from the riding .jsx
        <div className='h-screen'>
            {/* this is for the uber logo and the logout btn */}
            <div className="fixed p-6 top-1 flex justify-between items-center w-full">
                {/* <img className=" w-16" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" /> */}
                <img className="w-16" src="/yanzoo-logo.png" alt="Yanzoo Logo" />
                <Link to="/home" className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg ri-logout-box-line"></i>
                </Link>
            </div>

            {/* now  the div to show the map */}
            <div className='h-3/5 '>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            {/*=========================== captsin data starts here===================== */}
            {/* now the div to show the car details */}
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            {/* ==============captain data ends============================ */}
            {/* =============Ride popup starts here================= */}
            {/* we will make this in the ridepopup.jsx */}
            {/* now we will pass the ref to the ridepopup.jsx */}
            {/* if the usestate is true then this will be popped */}
            <div ref={RidepopupPanelRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full">
                {/* now we will send the set fucntion as the props */}
                <RidePopup
                    ride={ride}
                    setRidepopupPanel={setRidepopupPanel}
                    setConfirmRidepopupPanel={setConfirmRidepopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            {/* ==================Ride popup ends here========================================= */}
            {/* =============confirm ride pop up starts here================= */}
            <div ref={ConfirmRidepopupPanelRef} className="fixed h-screen w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full">
                {/* now we will send the set fucntion as the props */}
                <ConfirmRidePopup ride={ride} setConfirmRidepopupPanel={setConfirmRidepopupPanel} setRidepopupPanel={setRidepopupPanel} />
            </div>
            {/* =============confirm ride pop up ends here================= */}
        </div>
    );

}
export default Captainhome;
// now we will create the route for the captain home page
// go to app.jsx file
// now we will create the captain home route