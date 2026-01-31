// this is Home.jsx
// step : 36 create a home page

// for icons run:- npm i remixicon --save
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react'; // import the use gsap hook
import { useEffect } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmedRide from '../Components/ConfirmedRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForRider from '../Components/WaitingForRider';
const Home = () => {
  // usestate for the pickup and destination
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panel, setPanel] = useState(false);
  // now to name the panel we will use the useRef hook and initial vvalue is null
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null); // ref is used to select the element
  // useState for the different vehicle panel
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  // useState for the confirmed ride initial value is false
  const [confirmedRidePanelOpen, setConfirmedRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForRider, setWaitingForRider] = useState(false);

  // the vehicle panel will open when we will click on the location in the location search panel
  // another refferece for the vehicle panel
  const vehiclePanelRef = useRef(null);
  // another reference for the confirmed ride panel
  const confirmedRidePanelRef = useRef(null);
  // another reference for the vehicle found panel
  const vehicleFoundRef = useRef(null);
  const waitingForRiderRef = useRef(null);

  // now when the user clicks on the line then the panel will be visible
  // submit handler for the form 
  const submitHandler = (e) => {
    e.preventDefault();
  }

  // for the panel open we will use the gsap for the annnimation
  // by npm i @gsap/react and npm i gsap
  // now we will use the usegsap hook
  useGSAP(function () {
    // use the function gsap.to to animate the panel
    // now the logic is 
    if (panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        opacity: 1,
        padding: "24px"
      })
      // now we will animate the panel close icon
      gsap.to(panelCloseRef.current, { opacity: 1 })
    }
    // else the height will be 0
    else {
      gsap.to(panelRef.current, { height: "0%", opacity: 0 })
      // now we will animate the panel close icon
      gsap.to(panelCloseRef.current, { opacity: 0 })
    }

  }, [panel]) // it means when the panel changes then the animation will be reanimated



  // another gsap function 
  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehiclePanelOpen]) // it means when the vehiclePanel changes then the animation will be reanimated


  // another gsap function 
  useGSAP(function () {
    if (confirmedRidePanelOpen) {
      gsap.to(confirmedRidePanelRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(confirmedRidePanelRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [confirmedRidePanelOpen]) // it means when the confirmedRidePanel changes then the animation will be reanimated

  // another gsap function
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [vehicleFound])


  // another gsap function for the rider panel
  useGSAP(function () {
    if (waitingForRider) {
      gsap.to(waitingForRiderRef.current, {
        transform: "translateY(0)"
      })
    }
    else {
      gsap.to(waitingForRiderRef.current, {
        transform: "translateY(100%)"
      })
    }
  }, [waitingForRider])
  return (
    <div className='h-screen relative overflow-hidden'>

      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
      <div className='h-screen w-screen'>
        {/* imgae for temporary use */}
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      {/* div below this div */}
      <div className='absolute h-screen top-0 w-full flex flex-col justify-end'>
        <div className='h-[30%] p-6 bg-white'>
          {/* now the icon is added */}
          <h5
            ref={panelCloseRef}
            onClick={() => setPanel(false)}
            className='absolute  opacity-0 right-2 bottom-30 text-2xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <div className='relative'>
              <div className='line absolute h-16 w-1 top-[20%] left-5 bg-gray-900 rounded-full'></div>
              <input
                onClick={() => setPanel(true)}
                type="text"
                className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-5'
                placeholder='Add a pick-up location'
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
              <input
                onClick={() => setPanel(true)}
                type="text"
                className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-5'
                placeholder='Enter your destination'
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </form>

        </div>

        {/* another diiv */}
        {/* this div will be hidden by default */}
        {/* so the ref is the value of the panel ref */}
        <div ref={panelRef} className=' opacity-0 bg-white h-0'>
          {/* pass the vehicle panel and setVehiclePanel to the location search panel */}
          {/* also pass the panel and the panel close ref to the location search panel */}
          <LocationSearchPanel vehiclePanelOpen={vehiclePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} panel={panel} setPanel={setPanel} />
        </div>

      </div>
      {/* feature to show the features */}
      <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12">
        <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmedRidePanelOpen={setConfirmedRidePanelOpen} />
      </div>
      {/* now we will also render the confirmed ride */}
      <div ref={confirmedRidePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12">
        <ConfirmedRide setConfirmedRidePanelOpen={setConfirmedRidePanelOpen} setVehicleFound={setVehicleFound} />
      </div>

      {/* here we will reffer the wait for rider panel */}
      <div ref={vehicleFoundRef} className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12">
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      {/* now for waiting for rider */}
      <div ref={waitingForRiderRef} className="fixed z-10 bottom-0  bg-white w-full px-3 py-10 pt-12">
        <WaitingForRider
          waitingForRider={waitingForRider}
          setWaitingForRider={setWaitingForRider}
          setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
        />
      </div>
    </div>
  );
}
export default Home;
// flash.figr.design/explore/mobile/Apps/Uber