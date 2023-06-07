import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Signup } from '../pages';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate =  useNavigate()
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:3001/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        alert('Login successful!');
        navigate('/')
      } catch (error) {
        console.log(error);
        alert('Invalid credentials!');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button  className='bg-red-300' type="submit">Login</button>
        <br/>
        <Link to='/signup'>
        <button className='bg-red-300'>Signup</button>
        </Link>
      </form>
    );
  };

export default Login
