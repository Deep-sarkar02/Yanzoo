// step : 26 
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

// step :  48 now we will use the setCaptain here
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";





const CaptainSignup = () => {
  // create the variables
  const navigate = useNavigate();


  //perform two way data binding
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastName] = useState("");
  const [userdata, setUserdata] = useState({});

  // step :  48 :
  // after the import of captaincontext
  // we need other state varaibles
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setvehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  // now we need to set the captain data in the context
  const { captain, setCaptain } = React.useContext(CaptainDataContext);






  const submithandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {  // Fixed casing to match backend
        firstname,
        lastname
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity), // Ensure number type
        type: vehicleType
      }
    };

    console.log('Full Env Object:', import.meta.env);
    console.log('Sending registration request to:', `${import.meta.env.VITE_BASE_URL}/captains/register`);
    console.log('Payload:', newCaptain);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captain-token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Registration failed full error:', error);
      console.error('Registration failed response data:', error.response?.data);
      console.error('Registration failed message:', error.message);
      // Add error handling UI feedback here
    }

    //console.log(data);
    // set the data to the userdata
    //setUserdata(data);
    // now again reset the values
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setvehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");

  }




  return (
    <div>
      {/**step: -33 copy all the details from the userlogin page */}
      <div>
        <div className="p-7 h-screen flex flex-col justify-between">
          <h1 className="w-16 mb-10 text-3xl font-bold text-black" >Yanzoo</h1>
          {/**====================step: -31======================= */}
          {/* User Login Page */}
          <form action="" onSubmit={(e) => { submithandler(e) }} >

            <h3 className="text-base font-medium mb-2">What's your name ?</h3>

            <div className="flex gap-4 mb-6" >
              <input
                required



                // Corrected placeholder class and placeholder text
                className="bg-[#eeeeee]  w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstname}
                //when on chnage then the value will be set to the firstname
                onChange={(e) => { setFirstName(e.target.value) }}
              />


              <input
                required



                // Corrected placeholder class and placeholder text
                className="w-1/2 bg-[#eeeeee]  rounded px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => { setLastName(e.target.value) }}
              />


            </div>


            <h3 className="text-base font-medium mb-2">What's your email?</h3>

            <input
              required



              // Corrected placeholder class and placeholder text
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <h3 className="text-base font-medium mb-2">Enter Password</h3>

            <input
              required
              // Corrected placeholder class
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />


            {/* Vehicle Data Input Groups */}
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg  px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setvehiclePlate(e.target.value)}
              />



            </div>
            <div className="flex gap-4 mb-7">

              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                required
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
              Create Captain Account
            </button>




          </form>
          <p className="text-center">Already have a account  ?  <Link to='/captain-login' className="text-blue-600" >Login here </Link></p>
          <div>

            <p className="text-[10px] leading-tight" >
              By proceeding, you agree to Yanzoo's <span className="text-blue-600" >Terms of Service</span> and acknowledge that you have read the <span className="text-blue-600" >Privacy Policy</span>, including Cookie Use. </p>

          </div>
        </div>
      </div>

    </div>
  );
}
export default CaptainSignup;