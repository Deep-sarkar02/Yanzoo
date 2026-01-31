import React from "react";
//import { confirmedRidePanelOpen } from "../context/Usercontext";
// here we will copy all the content from the looking for driver panel
const WaitingForRider = (props) => {
    return (
        <div>
            <h5 className="p-1 text-center w-[90%] absolute top-0" onClick={() => { props.setConfirmedRidePanelOpen(false) }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            {/* div will display the data of the car */}
            <div className="flex items-center justify-between">
                <img className="h-12" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n" alt="" />
                <div className="text-right">
                    <h2 className="font-medium text-lg">Deep-sarkar</h2>
                    <h4 className="text-xl font-semibold -mt-2 -mb-1">WB04 AB1234</h4>
                    <p className="text-sm font-gray-600">Maruti suzuki swift</p>
                </div>
            </div>
            <div className="flex justify-between items-center flex-col">
                <div className="w-full mt-5">
                    {/* for the location */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/1-A</h3>
                            <p className="text-base -mt-1 text-gray-800">RashBihari Avenue , Kolkata</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/1-A</h3>
                            <p className="text-base -mt-1 text-gray-800">RashBihari Avenue , Kolkata</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹197.45</h3>
                            <p className="text-base -mt-1 text-gray-800">Cash ,cash</p>
                        </div>
                    </div>
                </div>
                {/* <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Confirm Ride</button> */}
            </div>
        </div>
    )
}
export default WaitingForRider