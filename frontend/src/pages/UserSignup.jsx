// step : 26 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // step : 37 import useNavigate
// step : 37 use the useNavigate hook to navigate to the home page after login
// we will use this in the submithandler function


// step : 38  import axios
import axios from "axios"
// import user context - Corrected the import name to UserContext
import { UserDataContext } from "../context/Usercontext";

const UserSignup = () => {
  //perform two way data binding
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastName] = useState("");
  const [userdata, setUserdata] = useState({});


  // heare we will use  usenavigate hook
  // we will use this in the submithandler function
  // after login we will navigate to the home page
  const navigate = useNavigate(); // step : 37 use the useNavigate hook to navigate to the home page after login


  // after the import of usercontext 
  // now we need to set the user data in the context
  // Corrected the context name to UserContext
  const { user, setUser } = React.useContext(UserDataContext);


  const submithandler = async (e) => // this function will be called when the form is submitted
  {
    e.preventDefault(); //stop the reload

    const newUser = {
      // Corrected key from 'fullName' to 'fullname'
      fullname:
      {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }

    try {
      // Corrected typo from 'respose' to 'response'
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      console.log(response);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        // step: 43 :  use local storage to store the user data
        //now after login 
        localStorage.setItem('token', data.token); // store the token in the local storage we will get from the data.token
        navigate('/home');





        // Moved state reset logic into the success block
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Here you can set an error state to show a message to the user
    }
  }



  // return body
  return (
    <div>
      {/**step: -33 copy all the details from the userlogin page */}
      <div>
        <div className="p-7 h-screen flex flex-col justify-between">
          <img
            className=" w-16 mb-10 "
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
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

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
              Create Account
            </button>




          </form>
          <p className="text-center">Already have a account  ?  <Link to='/login' className="text-blue-600" >Login here </Link></p>
          <div>

            <p className="text-[10px] leading-tight" >
              By proceeding, you agree to Uber's <span className="text-blue-600" >Terms of Service</span> and acknowledge that you have read the <span className="text-blue-600" >Privacy Policy</span>, including Cookie Use. </p>

          </div>
        </div>
      </div>

    </div>
  );
}
export default UserSignup;