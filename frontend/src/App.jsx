//=====================step-23========================
// now we will create a simple react app with a button
// that will change the text when clicked
import React, { use } from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import { useContext } from 'react';
import { UserDataContext } from './context/Usercontext';
import Home from './pages/Home';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import Captainhome from './pages/Captainhome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainLogout from './pages/CaptainLogout';
import Riding from './pages/Riding';

const App = () => {
  // aftetr the usercontext.jsx file is created
  // now we will use the context in this app.jsx file
  // we will use the useContext hook to use the context
  // we will import the UserDataContext from the usercontext.jsx file
  // and then we will use the useContext hook to get the data from the context
  // and then we will display the data in the home page
  const ans = useContext(UserDataContext); // now we can use this user variable in any of the routes
  // now we will display this in the home page
  console.log(ans); // now we will see the value of the user variable in the console




  return (
    <div>
      {/**here we can create the routes now */}
      <Routes>
        {/**this is the home route render the Home */}
        <Route path='/' element={<Start />} />

        {/** now render the login page */}
        <Route path='/login' element={<UserLogin />} />
        {/* now we will render the riding page */}
        <Route path='/riding' element={<Riding />} />

        {/** now render the signup page */}
        <Route path='/signup' element={<UserSignup />} />

        {/** now for the captain login page */}
        <Route path='/captain-login' element={<CaptainLogin />} />

        {/** now for the captain signup page */}
        <Route path='/captain-signup' element={<CaptainSignup />} />

        {/** now for the home page */}

        {/*step :  44 : wrap the home component with the userprotectwrapper */}
        <Route path='/home' element={
          /* here we will use the user protect wrapper */
          <UserProtectWrapper>
            <Home /> {/* now the home component is wrapped inside the userprotectwrapper */}
          </UserProtectWrapper>
        } />



        {/** now we can create more routes here */}
        {/** for the user and the captain logout page */}
        {/** step : 45   */}

        <Route path="/user/logout" element=
          {

            <UserProtectWrapper>
              {/** now we will render the userLogout  */}
              <UserLogout />
            </UserProtectWrapper>
          } />



        {/** now we can create the captain home page */}
        <Route path="/captain-home" element=
          {
            <CaptainProtectWrapper>
              <Captainhome />
            </CaptainProtectWrapper>
          }
        />

        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />


      </Routes>
    </div>

  )
};
export default App;