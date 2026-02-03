
// step : 26 
import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      {/*********step - 30 this is the Home.jsx******* */}
      <div className='bg-cover bg-center bg-[url(/start-background.png)] h-screen pt-8  flex justify-between flex-col  w-full bg-yellow-400'>

        {/* <img  className = " w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /> */}
        {/* <h1 className="w-16 ml-8 text-3xl font-bold text-black" >Yanzoo</h1> */}
        <img className="w-20 ml-8" src="/yanzoo-logo.png" alt="Yanzoo Logo" />
        <div className='bg-white pb-7  py-4 px-4'>
          <h2 className='text-[30px] font-bold'>Get Started With Yanzoo</h2>
          <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'> Continue</Link>
        </div>
      </div>
    </div>
  );
}
export default Start;