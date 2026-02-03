import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../Components/FinishRide";
//  when the captain accepts the ride then this page will be shown
const CaptainRiding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    // usestate panel for the finish ride
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    // use ref for the finish ride panel
    const finishRidePanelRef = useRef(null);
    // now we will use the gsap function to show the finish page
    // now we will use this to show the popup
    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(0)"
            })
        }
        else {// if it is false
            gsap.to(finishRidePanelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [finishRidePanel])

    return (

        // {/* now we will copy from the captain home.jsx */}
        <div className='h-screen'>

            {/* this is for the uber logo and the logout btn */}
            <div className="fixed p-6 top-1 flex justify-between items-center w-screen">
                {/* <img className=" w-16" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" /> */}
                <h1 className="w-16 text-3xl font-bold text-black" >Yanzoo</h1>
                <Link to="/captain-home" className=" h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg ri-logout-box-line"></i>
                </Link>
            </div>

            {/* dashboard to show the driver options */}
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className="h-1/5 p-6 bg-yellow-400 flex justify-between items-center relative"
                // now when we click on this div then the finish ride panel will be shown
                onClick={() => {
                    setFinishRidePanel(true)
                }}>
                {/* now this is the down arrow */}
                <h5 className="p-1 text-center w-full absolute top-0"
                    // now while on click then the set function will activate and make the function to true
                    onClick={() => { }}>
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </h5>
                <h4 className="text-xl font-semibold">3 Km Away</h4>
                <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Complete Ride</button>

            </div>
            {/* dash board ends here */}
            <div ref={finishRidePanelRef} className="fixed  w-screen z-10 bottom-5 bg-white px-3 py-10 pt-12 translate-y-full">
                {/* now we will send the set fucntion as the props */}
                <FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>


    )
}
export default CaptainRiding;