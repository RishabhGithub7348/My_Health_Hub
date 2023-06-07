import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    telephone: "",
    gender: "",
    address: "",
    dob: "",
    city: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);
  const { formNavigate,
    setFormNavigate} = useContext(UserContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form };
      console.log(payload);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        'https://my-health-hub-9wxa.onrender.com/api/submitForm',
        payload,
        config
      );

      if (response.status === 200) {
        setLoading(false);
        setFormNavigate(true);
        navigate('/profile');
        
        console.log('Form data submitted successfully');
        alert("Thank you.");
        e.target.reset();
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error submitting form data:', error);
      alert("Ahh, something went wrong. Please try again.");
    }
  };

  

  return (
    <div className='flex flex-col  w-[500px] bg-white rounded-lg -mt-14  p-2'>
      <div className='border-2 h-full w-2 bg-blue-500'></div>

     
     <div className=''>
        <div className='flex items-center justify-start'>
        <p className='text-2xl font-bold opacity-70'>Enter Details</p>
      </div>
      <form className='flex flex-col mt-2 gap-2 w-full' onSubmit={handleSubmit}>
        <div>
          <p className='text-base font-semibold text-slate-600'>Name:</p>
        </div>
        <div className='flex items-center'>
          <input className='flex-1 items-center outline-0  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text" placeholder='Enter your Name' />
        </div>

        <div>
          <p className='text-base font-semibold text-slate-600'>Telephone:</p>
        </div>
        <div className='flex items-center'>
          <input className='flex-1 items-center outline-0  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name='telephone'
          value={form.telephone}
          onChange={handleChange}
          type="tel" placeholder='Enter your Telephone' />
        </div>
        
        <div>
          <p className='text-base font-semibold text-slate-600'>Gender:</p>
        </div>
        <div className='flex items-center'>
          <select className='flex-1 outline-0 border-2 rounded-lg bg-slate-100 p-2'
          name="gender"
          value={form.gender}
          onChange={handleChange}
          > 
          <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>


        <div>
          <p className='text-base font-semibold text-slate-600'>Address:</p>
        </div>
        <div className='flex items-center'>
          <input className='flex-1 items-center outline-0  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name="address"
          value={form.address}
          onChange={handleChange}
          type="text" placeholder='Enter your Address' />

        </div>

        <div>
        <p className='text-base font-semibold text-slate-600'>Date of Birth:</p>
      </div>
      <div className='flex items-center'>
      <input
  className="flex-1 items-center outline-0 focus:border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2"
  name="dob"
  value={form.dob.toString()} // Convert the value to a string
  onChange={handleChange}
  type="date"
  placeholder="Select your Date of Birth"
/>

      </div>

      <div>
        <p className='text-base font-semibold text-slate-600'>City:</p>
      </div>
      <div className='flex items-center'>
        <input
          className='flex-1 items-center outline-0 focus:border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name='city'
          value={form.city}
          onChange={handleChange}
          type='text'
          placeholder='Enter your City'
        />
      </div>

      <div>
        <p className='text-base font-semibold text-slate-600'>ZIP Code:</p>
      </div>
      <div className='flex items-center'>
        <input
          className='flex-1 items-center outline-0 focus:border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-lg bg-slate-100 p-2'
          name='zipCode'
          value={form.zipCode}
          onChange={handleChange}
          type='text'
          placeholder='Enter your ZIP Code'
        />
      </div>

        
        <div className='flex items-center justify-start mt-3'>
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white w-2/5 ml-5 font-bold py-2 px-4 rounded-lg'>
        {loading ? "Submiting..." : "submit"}
        </button>
        </div>
      </form>
    </div>
      </div>
  );
};

export default Form;