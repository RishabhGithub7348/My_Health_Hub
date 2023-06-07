import React, {useState,useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import {  useNavigate } from 'react-router-dom';

// import { Login, Signup } from '../pages';
import axios from 'axios';

import {logo} from "../images"
import { UserContext } from '../context/userContext';

const Navbar = () => {
  const [logouts, setLogouts] = useState(false);
  const [visible, setVisible] = React.useState(false);
  // const [visibleSignup, setVisibleSignup] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginEmail, setLoginEmail] = useState('');
  // const [loginPassword, setLoginPassword] = useState('');
  // const [signupEmail, setSignupEmail] = useState('');
  // const [signupPassword, setSignupPassword] = useState('');
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    formNavigate,
  } = useContext(UserContext);


    const navigate =  useNavigate();

    // const handleSubmitsignup = async () => {
      
  
    //   try {
    //     await axios.post('http://localhost:3001/signup', { signupEmail, signupPassword,  userId: uuid()  });
    //     // alert('Signup successful!');
    //     // navigate('/')
    //     setVisibleSignup(false);
    //   } catch (error) {
    //     console.log(error);
    //     alert('Something went wrong!');

    //   }
    // };

    const handleSubmit = async () => {
      
  
      try {
        const response = await axios.post('http://localhost:3001/login', { email, password },
        );
        const token = response.data.token;
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        
  
        setVisible(false);
      } catch (error) {
        console.log(error);
        alert('Invalid credentials!');
      }
    };

  
   




  const handler = () => setVisible(true);

  // const handleSignup = () => setVisibleSignup(true);


  const closeHandler = () => {

    setVisible(false);
    
    console.log(" closed");
  };

  // const closeHandlerSignup = () => {
  //   setVisibleSignup(false);
    
  //   console.log("closed");
  // };


  
  


  // const { loginWithRedirect } = useAuth0();
  // const { logout } = useAuth0();
  // const logout = async () => {
  //   try {
  //     await axios.post('http://localhost:3001/logout');
  //     // redirect the user to the login page or update the state to indicate that the user is no longer logged in
  //     console.log('Logout successful!');
  //     setLogouts(true);
  //     setIsAuthenticated(false);
     
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.post('http://localhost:3001/logout', null, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // setToken('');
  //     console.log('Logout successful!');
  //     setLogouts(true);
  //     setIsAuthenticated(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  
  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/logout');
  
      // Check if the response data exists
      if (response && response.data) {
        localStorage.removeItem('token');
        setLogouts(true);
      setIsAuthenticated(false);
      
        console.log(response.data);
        navigate('/');
      } else {
        // Handle error case where response data is undefined
        console.error('Invalid response data');
      }
    } catch (error) {
      // Handle error case
      console.error(error);
    }
  }
  

  

  return (
    <>
     <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to 
            <Text b size={18}>
              DR. Report
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleSubmit}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to 
            <Text b size={18}>
              DR. Report
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleSubmitsignup}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal> */}
    <div>
  <div className="w-full flex items-center justify-between bg-white sm:px-8 px-4 py-5 ">
    <div className="flex items-center text-3xl justify-center">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain h-15 w-15" />
      </Link>
    </div>

    <div className="flex  items-center gap-8 ml-5">
      <div className="flex items-center text-base font-medium  gap-10">
        <div className='text-base font-semibold text-gray-700 '>
          <Link to="/" >
            Home
          </Link>
        </div>
        
          {/* <div  className='text-base font-semibold text-gray-700 '>
            <Link to="/profile">Dashboard</Link>
          </div>
       
          <div  className='text-base font-semibold text-gray-700 '>
            <Link to="/form">Form</Link>
          </div> */}

      
              <div  className='text-base font-semibold text-gray-700 '>
              <Link to="/profile">Dashboard</Link>
            </div>
           
              
          <div  className='text-base font-semibold text-gray-700 '>
          <Link to="/form">Form</Link>
        </div>

           
       
        <div  className='text-base font-semibold text-gray-700 '>
          <Link to="/record" >
            Records
          </Link>
        </div>
        <div  className='text-base font-semibold text-gray-700 '>
          <Link to="/appointment">
            Appointments
          </Link>
        </div>
        <div  className='text-base font-semibold text-gray-700 '>
          <Link to="/remainder" >
            Reminders
          </Link>
        </div>
      </div>
      {isAuthenticated ? (
        <>
          <div>
            <button
              onClick={() => logout()}
              className="font-inter font-medium bg-[#0F5BFF] text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Log out
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            className="font-inter font-medium bg-[#0F5BFF] text-white px-7 py-3 rounded-full  hover:bg-blue-500"
            onClick={handler}
          >
            Log In
          </button>
        </>
      )}
      {
        !isAuthenticated && (
          <div className="font-inter font-medium bg-[#0F5BFF] text-white px-6 py-3 rounded-full hover:bg-blue-700">
        <Link to="/signup" >
          Sign Up
        </Link>
      </div>
        )
      }
      
    </div>
  </div>
</div>

    </>
  )
}

export default Navbar