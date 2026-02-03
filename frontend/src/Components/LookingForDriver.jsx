// after pressing the confirmed  button the looking for driver panel will open
import React from "react";
const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className="p-1 text-center w-[90%] absolute top-0" onClick={() => { props.setVehicleFound(false) }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h2 className="text-2xl gap-2 font-semibold mb-5">Looking for a Driver</h2>
            <div className="flex justify-between items-center flex-col">
                <img className="h-20" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n" alt="" />
                <div className="w-full mt-5">
                    {/* for the location */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Pickup</h3>
                            <p className="text-base -mt-1 text-gray-800">{props.pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-base -mt-1 text-gray-800">{props.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
                            <p className="text-base -mt-1 text-gray-800">Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LookingForDriver;