
// step : 26 
import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
        {/*********step - 30 this is the Home.jsx******* */}
      <div  className='bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_2144,w_2144/v1696243819/assets/18/34e6fd-33e3-4c95-ad7a-f484a8c812d7/original/fleet-management.jpg)] h-screen pt-8  flex justify-between flex-col  w-full bg-red-400'>
               
               <img  className = " w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
               <div className='bg-white pb-7  py-4 px-4'>
                      <h2 className='text-[30px] font-bold'>Get Started With Uber</h2>
                      <Link to= '/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'> Continue</Link>
               </div>
      </div>
    </div>
  );
}
export default Start;