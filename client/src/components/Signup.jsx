import React, {useEffect,useState} from 'react'
import axios from 'axios'


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await axios.post('http://localhost:3000/signup', { email, password  });
        alert('Signup successful!');
      } catch (error) {
        console.log(error);
        alert('Something went wrong!');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
        <button type="submit">Signup</button>
      </form>
    );
  };

export default Signup
