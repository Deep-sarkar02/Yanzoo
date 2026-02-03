import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



// when we click the complete button then this finish ride will be executed
const FinishRide = (props) => {
    console.log(props)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const finishRide = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
                {
                    rideId: props.ride._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('captain-token')}`
                    }
                }
            );

            if (response.status === 200) {
                props.setFinishRidePanel(false);
                // Navigate to captain home after successful completion
                navigate('/captain-home');
            }
        } catch (error) {
            console.error("Error finishing ride:", error);
            alert(error.response?.data?.message || "Failed to finish ride");
        } finally {
            setLoading(false);
        }
    };

    return (
        // here we will copy the ui from the confirm ride popup.jsx
        <div>
            {/* now we will copy the ui from the confirmeed ridde.jsx */}
            {/* this is for the ride popup */}
            <h5 className="p-1 text-center w-[93%] absolute top-0"
                // now while on click then the set function will activate and make the function to true
                onClick={() => {
                    props.setFinishRidePanel(false)
                }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h2 className="text-2xl gap-2 font-semibold mb-2">Finish the Ride!</h2>
            {/* user details  starts*/}
            <div className="flex items-center justify-between border-2 border-yellow-500 mt-4 p-4 rounded-lg">
                <div className="flex items-center gap-2 ">
                    {/* user image */}
                    <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUtppxAYvLQxuaGpNpfglY-s1oubTXk0EmQ&s" alt="" />
                    {/* user name */}
                    <h2 className="text-xl font-medium">{props.ride?.user.fullname.firstname}</h2>
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
                            <h3 className="text-lg font-medium">562/1-A</h3>
                            <p className="text-base -mt-1 text-gray-800">{props.ride?.pickup_location}</p>
                        </div>
                    </div>
                    {/* pickup ends */}

                    {/* destination */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/1-A</h3>
                            <p className="text-base -mt-1 text-gray-800">{props.ride?.dropoff_location}</p>
                        </div>
                    </div>
                    {/* destination ends */}

                    {/* amount */}
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                            <p className="text-base -mt-1 text-gray-800">Cash ,cash</p>
                        </div>
                    </div>
                    {/* amount ends */}
                </div>
                {/* pickup and destination ends */}
                {/* now comws the button to complete the ride */}
                <div className="mt-6 w-full ">


                    {/* complete btn starts */}
                    {/* on click the confirm btn then the captain will be going to the captain riding page */}
                    <button
                        onClick={finishRide}
                        disabled={loading}
                        className={`w-full mt-3 mb-3 flex justify-center bg-green-600 text-white text-lg font-semibold p-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {loading ? 'Finishing...' : 'Finish Ride'}
                    </button>
                    {/* complete btn ends */}

                </div>
            </div>
            {/* rider dashboard ends */}
        </div>
    )
}
export default FinishRide;