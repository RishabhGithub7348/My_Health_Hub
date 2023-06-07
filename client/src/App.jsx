import React, {useState,useEffect, useContext} from 'react'
import { BrowserRouter ,Link, Route,Routes } from 'react-router-dom'
import {Home, Signup,Login, RegistrationForm, Profile, Record, Remainder, Appointment} from './pages';
import {Navbar,Footer} from './components';
import axios from 'axios';

import { UserContext } from './context/userContext';


const App = () => {
  
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    formNavigate,
    setFormNavigate,
  } = useContext(UserContext);

  return (
    // bg-[#f9fafe] 
    <BrowserRouter>
   <Navbar/>
    <main className="sm:p-8 px-4 py-8 w-full bg-white min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        
       
        
              <Route path="/form" element={<RegistrationForm />} />
             
              <Route path="/profile" element={<Profile />} /> 
           
        
        
        
        <Route path="/record" element={<Record />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/remainder" element={<Remainder />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </main>
    <Footer/>
  </BrowserRouter>
  )
}

export default App
