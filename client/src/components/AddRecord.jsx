import { useState } from 'react';
import React from 'react';
import { Modal, Button, Input } from 'antd';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';

const AddRecord = ({ visible, onClose }) => {
  const [file, setFile] = useState(null);
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [treatment, setTreatment] = useState('');

  
  const token = localStorage.getItem('token');
  
  const handlePdfChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('doctorName', doctorName);
      formData.append('appointmentDate', appointmentDate);
      formData.append('appointmentTime', appointmentTime);
      formData.append('treatment', treatment);

      const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        
      },
    };
  
    await axios.post('https://my-health-hub-9wxa.onrender.com/api/add-record', formData, config);
  
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={visible}
      title="Add Record"
      onCancel={onClose}
      footer={[
        <Button key="cancel" className='border-2 rounded-md' onClick={onClose}>Cancel</Button>,
        <Button key="save" className='bg-blue-600 text-white border-3 rounded-md' onClick={handleSave}>Save</Button>
      ]}
    >
      <div className='mt-3 border-2 rounded-md'>
        <Input
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>
      <div className='mt-3 border-2 rounded-md'>
        <Input
          placeholder="Treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
      </div>
      <div className='mt-3 p-2 border-2 rounded-md'>
        <label htmlFor="pdf-upload">PDF:</label>
        <br />
        <input type="file" id="pdf-upload" onChange={handlePdfChange} />
      </div>
      <div className='flex items-center justify-between space-x-3 mt-3'>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                className='border-2 rounded-md'
                label="Select Date"
                value={appointmentDate}
                onChange={(newValue) => setAppointmentDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker', 'TimePicker']}>
              <TimePicker
                label="Select Time"
                value={appointmentTime}
                onChange={(newValue) => setAppointmentTime(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
    </Modal>
  );
};

export default AddRecord;
