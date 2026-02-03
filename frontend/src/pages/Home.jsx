// this is Home.jsx
// step : 36 create a home page

// for icons run:- npm i remixicon --save
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react'; // import the use gsap hook
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmedRide from '../Components/ConfirmedRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForRider from '../Components/WaitingForRider';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/Usercontext';

import axios from 'axios';
import { Socket } from 'socket.io-client';
const Home = () => {
  const navigate = useNavigate();
  // usestate for the pickup and destination
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panel, setPanel] = useState(false);
  // suggestions states
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  // now to name the panel we will use the useRef hook and initial vvalue is null
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null); // ref is used to select the element
  // useState for the different vehicle panel
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  // useState for the confirmed ride initial value is false
  const [confirmedRidePanelOpen, setConfirmedRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForRider, setWaitingForRider] = useState(false);
  // useState for the fare
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  // export the socket
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  useEffect(() => {
    if (!user) return;
    sendMessage('join', { userId: user._id, userType: 'user' });
  }, [user]);


  useEffect(() => {
    receiveMessage('ride-confirmed', (data) => {
      setVehicleFound(false);
      setWaitingForRider(true);
      setRide(data);
      console.log('Ride confirmed:', data);
    })

    receiveMessage('ride-started', (data) => {
      setWaitingForRider(false)
      navigate('/riding', { state: { ride: data } })
    })
  }, [receiveMessage]);


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

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    if (e.target.value.length < 3) {
      setPickupSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user-token')}`
        }
      });
      console.log("Pickup Suggestions:", response.data.suggestion);
      setPickupSuggestions(response.data.suggestion);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    if (e.target.value.length < 3) {
      setDestinationSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user-token')}`
        }
      });
      console.log("Destination Suggestions:", response.data.suggestion);
      setDestinationSuggestions(response.data.suggestion);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
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
        transform: "translateY(0)",
        display: 'block'
      })
    }
    else {
      gsap.to(confirmedRidePanelRef.current, {
        transform: "translateY(100%)",
        display: 'none'
      })
    }
  }, [confirmedRidePanelOpen]) // it means when the confirmedRidePanel changes then the animation will be reanimated

  // another gsap function
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
        display: 'block'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
        display: 'none'
      })
    }
  }, [vehicleFound])


  // another gsap function for the rider panel
  useGSAP(function () {
    if (waitingForRider) {
      gsap.to(waitingForRiderRef.current, {
        transform: "translateY(0)",
        display: 'block'
      })
    }
    else {
      gsap.to(waitingForRiderRef.current, {
        transform: "translateY(100%)",
        display: 'none'
      })
    }
  }, [waitingForRider])

  //on click of the find trip we will execute this function
  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanel(false);
    setVehicleFound(false);
    setConfirmedRidePanelOpen(false);
    setWaitingForRider(false);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params:
            { pickup_location: pickup, dropoff_location: destination },
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`
          }
        });
      setFare(response.data.fare);
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  }

  // function to create the ride
  // we will accept the vehicle type as the parameter
  async function createRide() {
    // nwo we will hit the create ride api
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
        {
          pickup_location: pickup,
          dropoff_location: destination,
          vehicleType: vehicleType
        },
        {
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`
          }
        }
      )
      console.log(response.data);
    } catch (error) {
      console.error("Error creating ride:", error);
    }

  }



  // return the JSX
  return (
    <div className='h-screen relative overflow-hidden'>

      {/* <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" /> */}
      <h1 className='w-16 absolute left-5 top-5 text-3xl font-bold text-black'>Yanzoo</h1>
      <div className='h-screen w-screen'>
        {/* imgae for temporary use */}
        <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      {/* div below this div */}
      <div className='absolute h-screen top-0 w-full flex flex-col justify-end'>
        <div className='h-fit p-6 bg-white relative'>
          {/* now the icon is added */}
          <h5
            ref={panelCloseRef}
            onClick={() => setPanel(false)}
            className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <div className='relative'>
              <div className='line absolute h-16 w-1 top-[20%] left-5 bg-gray-900 rounded-full'></div>
              <input
                onClick={() => {
                  setPanel(true)
                  setVehiclePanelOpen(false)
                  setConfirmedRidePanelOpen(false)
                  setVehicleFound(false)
                  setWaitingForRider(false)
                  setActiveField('pickup')
                }}
                type="text"
                className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-5'
                placeholder='Add a pick-up location'
                value={pickup}
                onChange={handlePickupChange}
              />
              <input
                onClick={() => {
                  setPanel(true)
                  setVehiclePanelOpen(false)
                  setConfirmedRidePanelOpen(false)
                  setVehicleFound(false)
                  setWaitingForRider(false)
                  setActiveField('destination')
                }}
                type="text"
                className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mt-5'
                placeholder='Enter your destination'
                value={destination}
                onChange={handleDestinationChange}
              />
            </div>
          </form>
          {/* now we will add a button to find the trip */}
          <button
            onClick={() => {
              findTrip()
            }}
            className='bg-black text-white px-4 py-2 rounded-lg mt-5 w-full'>Find Trip</button>

        </div>

        {/* another diiv */}
        {/* this div will be hidden by default */}
        {/* so the ref is the value of the panel ref */}
        <div ref={panelRef} className=' opacity-0 bg-white h-0'>
          {/* pass the vehicle panel and setVehiclePanel to the location search panel */}
          {/* also pass the panel and the panel close ref to the location search panel */}
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanel={setPanel}
          />
        </div>

      </div>
      {/* feature to show the features */}
      <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12">
        <VehiclePanel
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
          fare={fare}
          setVehicleType={setVehicleType} />
      </div>
      {/* now we will also render the confirmed ride */}
      <div ref={confirmedRidePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12">
        <ConfirmedRide
          setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare} />
      </div>

      {/* here we will reffer the wait for rider panel */}
      <div ref={vehicleFoundRef} className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12">
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
      </div>

      {/* now for waiting for rider */}
      <div ref={waitingForRiderRef} className="fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-10 pt-12">
        <WaitingForRider
          ride={ride}
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