import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const ConfirmRidePopup = (props) => {
    console.log(props)
    // usestqate for setting the otp
    const [otp, setopt] = useState("")
    // now for the submit handler
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captain-token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidepopupPanel(false)
            props.setRidepopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }
    return (
        <div>
            {/* now we will copy the ui from the confirmeed ridde.jsx */}
            {/* this is for the ride popup */}
            <h5 className="p-0 text-center w-[90%] absolute top-0"
                // now while on click then the set function will activate and make the function to true
                onClick={() => {
                    props.setConfirmRidepopupPanel(false)
                    props.setRidepopupPanel(false)
                }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h2 className="text-2xl gap-2 font-semibold mb-2">Confirm this Ride to start!</h2>
            {/* user details  starts*/}
            <div className="flex items-center justify-between bg-yellow-500 mt-4 p-3 rounded-lg">
                <div className="flex items-center gap-2 ">
                    {/* user image */}
                    <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUtppxAYvLQxuaGpNpfglY-s1oubTXk0EmQ&s" alt="" />
                    {/* user name */}
                    <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className="text-lg font-medium">2.2 km away</h5>
            </div>
            {/* user details ends */}

            {/* rider dashboard */}
            <div className="flex justify-between items-center flex-col">
                {/* pickup and destination starts */}
                <div className="w-full mt-3">
                    {/* pickup */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Pickup</h3>
                            <p className="text-base -mt-1 text-gray-800">{props.ride?.pickup_location}</p>
                        </div>
                    </div>
                    {/* pickup ends */}

                    {/* destination */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-base -mt-1 text-gray-800">{props.ride?.dropoff_location}</p>
                        </div>
                    </div>
                    {/* destination ends */}

                    {/* amount */}
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                            <p className="text-base -mt-1 text-gray-800">Cash</p>
                        </div>
                    </div>
                    {/* amount ends */}
                </div>
                {/* pickup and destination ends */}
                {/* now comws the button to accept and reject */}
                <div className="mt-6 w-full ">
                    {/* here will be the form  */}
                    <form action="" onSubmit={(e) => submitHandler(e)}>
                        {/* input form for the OTP */}
                        <input type="number"
                            // this value will be same as the usestate value 
                            value={otp}
                            // when we type the value then the otp will be set 
                            onChange={(e) => setopt(e.target.value)}
                            className=" font-mono bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                            placeholder="Enter OTP" />

                        <button className="w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">Confirm</button>
                        {/* confirm btn ends */}

                        {/*cancel btn starts */}
                        <button onClick={() => {
                            props.setConfirmRidepopupPanel(false)

                        }} className="w-full mt-2 bg-red-500 text-white font-semibold p-3 rounded-lg">Cancel</button>
                        {/* cancel btn ends */}

                    </form>
                    {/* form ends */}
                </div>
            </div>
            {/* rider dashboard ends */}
        </div>
    )
}
export default ConfirmRidePopup;