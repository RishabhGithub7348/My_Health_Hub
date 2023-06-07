import React, {useContext, useEffect,useState} from 'react'
import axios from 'axios';
import { UserContext } from '../context/userContext';


import { Link, useNavigate } from 'react-router-dom';

import { Mail } from '../components/Mail';

import { Password } from '../components/Password';


import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated,
      setIsAuthenticated,} = useContext(UserContext)
    
    const navigate =  useNavigate();
  
    const handleSubmit = async () => {

  
      try {
       const response =  await axios.post('http://localhost:3001/signup', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
      
        setIsAuthenticated(true);
        navigate('/')
      } catch (error) {
        console.log(error);
        alert('Something went wrong!');

      }
    };
    const visible = true;
    return (
      <>
       <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to 
            <Text b size={18}>
              DR. Report Sign
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
        
          <Button className='bg-blue-500' auto onPress={handleSubmit}>
            Sign IN
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  };

export default Signup
