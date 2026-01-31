import React from 'react'
import { Link } from 'react-router-dom'
// when the user will star the ride then this page will be visible
// for icons we are using the remixicons
const Riding = () => {
    return (
        <div className='h-screen'>
            {/* div for the home icons */}
            <Link className='right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full' to="/home">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            {/* now  the div to show the image */}
            <div className='h-1/2 '>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            {/* now the div to show the car details */}
            <div className='h-1/2 p-4'>
                {/* copid code from the waiting for rider.jsx */}
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
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">562/1-A</h3>
                                <p className="text-base -mt-1text-gray-800">RashBihari Avenue , Kolkata</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3">
                            <i className="text-lg ri-currency-line"></i>
                            <div>
                                <h3 className="text-lg font-medium">₹197.45</h3>
                                <p className="text-base -mt-1text-gray-800">Cash ,cash</p>
                            </div>
                        </div>
                    </div>
                    {/* <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Confirm Ride</button> */}
                </div>
                {/* here we will have the payment option */}
                <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a Payment</button>

            </div>
        </div>
    )
}
export default Riding
