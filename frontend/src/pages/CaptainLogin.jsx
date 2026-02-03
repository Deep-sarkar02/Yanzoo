// step : 26 
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// step : 50 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';





const CaptainLogin = () => {


  const [email, setEmail] = useState(''); // initially empty

  // for password
  const [password, setPassword] = useState(''); // initially empty

  // step:50
  // usestate snippet for the setcaptain 
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate(); // step : 50 use the useNavigate hook to navigate to the home page after login



  // for the user loginf data
  //const[captainData , setCaptainData] = useState({}); // initially empty object

  // now create a submit handler function
  const submithandler = async (e) => {
    e.preventDefault(); // to prevent the default behaviour of the form

    // now we will set the user data
    const captain = {
      email: email, // key and value are same so we can write only once
      password: password
    }

    console.log('Sending login request to:', `${import.meta.env.VITE_BASE_URL}/captains/login`);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
      // status check
      if (response.status === 200) {
        const data = response.data;
        // set the captain data in the context
        setCaptain(data.captain); // step : 50
        // use local storage to store the captain data
        localStorage.setItem('captain-token', data.token); // store the token in the local storage we will get from the data.token
        // navigate to the home page
        navigate('/captain-home'); // step : 50
      }
    } catch (error) {
      console.error('Login failed full error:', error);
      console.error('Login failed response data:', error.response?.data);
      console.error('Login failed message:', error.message);
    }
    //console.log(captainData);

    setEmail(''); // to clear the input field
    setPassword(''); // to clear the input field
  }



  return (
    //step : -32 paste the deatils fromt the userlogin page
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <h1 className="w-20 mb-3 text-3xl font-bold text-black" >Yanzoo</h1>
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
        <p className="text-center">Join a fleet?<Link to='/captain-signup' className="text-blue-600" > Register as a Captain </Link></p>
        <div>
          <Link to='/login' className="bg-[#d5622d]  flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base" >Sign in as user</Link>
        </div>
      </div>
    </div>
  );
}
export default CaptainLogin;