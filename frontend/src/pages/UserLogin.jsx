// step : 26
import React, { useState } from "react";
import { Link } from "react-router-dom";
// step : 41 : do  the same as done in the UserSignup.jsx file
import { UserDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import axios from "axios";

const UserLogin = () => {

  // now we will use the 2 way binding to get the value of the input
  const [email, setEmail] = useState(''); // initially empty

  // for password
  const [password, setPassword] = useState(''); // initially empty

  // for the user loginf data
  const [userData, setUserData] = useState({}); // initially empty object



  // step : 41: same
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();










  // now create a submit handler function
  const submithandler = async (e) => {
    e.preventDefault(); // to prevent the default behaviour of the form

    // now we will set the user data
    // setUserData({
    //   email : email, // key and value are same so we can write only once
    //   password : password
    // })
    // console.log(userData);

    const loginUser = {
      email: email,
      password: password
    }

    console.log('Sending login request to:', `${import.meta.env.VITE_BASE_URL}/users/login`);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginUser)

      if (response.status === 200) {
        const data = response.data;

        setUser(data.user); // set the user data in the context
        // step: 43 :  use local storage to store the user data
        //now after login 
        localStorage.setItem('user-token', data.token); // store the token in the local storage we will get from the data.token

        navigate('/home'); // navigate to the home page
      }
    } catch (error) {
      console.error('Login failed full error:', error);
      console.error('Login failed response data:', error.response?.data);
      console.error('Login failed message:', error.message);
    }

    setEmail(''); // to clear the input field
    setPassword(''); // to clear the input field
  }

  return (
    // Wrap everything in a single root element
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <h1 className="w-16 mb-10 text-3xl font-bold text-black" >Yanzoo</h1>
        {/**====================step: -31======================= */}
        {/* User Login Page */}
        <form action="" onSubmit={(e) => { submithandler(e) }} >
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>

          <input
            required
            // Added value attribute for two-way binding
            value={email}

            onChange={(e) => {
              //console.log(e.target.value);
              setEmail(e.target.value);
            }}


            // Corrected placeholder class and placeholder text
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            required
            // Corrected placeholder class
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}

            onChange={(e) => {
              //console.log(e.target.value);
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Login
          </button>




        </form>
        {/**link from the react router dom  */}
        <p className="text-center">New Here ?  <Link to='/signup' className="text-blue-600" > Create A New Account </Link></p>
        <div>
          <Link to='/captain-login' className="bg-[#10b461]  flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base" >Sign in as Captian</Link>
        </div>
      </div>
    </div>

  );
};
export default UserLogin;