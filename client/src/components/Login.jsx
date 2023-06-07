import React, {useContext, useEffect,useState} from 'react'
import axios from 'axios'
import { Signup } from '../pages';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated, setIsAuthenticated} = useContext(UserContext)
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
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
        <Link to='/signup'>
        <button className='bg-red-300'>Signup</button>
        </Link>
      </form>
    );
  };

export default Login
