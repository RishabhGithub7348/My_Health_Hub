import { useState }  from 'react';
import React from 'react';
import { Modal, Button, Input } from 'antd';
// import { TimePicker } from 'antd';
// import { DatePicker, Space } from 'antd';

import moment from 'moment';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';



const AddNoteModal = ({ visible, onClose, onSave }) => {
  const [note, setNote] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [treatment, setTreatment] = useState('');

  const token = localStorage.getItem('token');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    const data = {
      doctorName,
      appointmentDate,
      appointmentTime,
      treatment,
      note,
    };

    fetch('https://my-health-hub-9wxa.onrender.com/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      setDoctorName('');
      setAppointmentDate('');
      setAppointmentTime('');
      setNote('');
      onSave(data); // Pass the new note data to the onSave callback function
      onClose();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Modal
      open={visible} 
      title="Add Note"
      onCancel={onClose}
      footer={[
        <Button key="cancel" className='border-2 rounded-md' onClick={onClose}>Cancel</Button>,
        <Button key="save" className='bg-blue-600 text-white border-3 rounded-md'  onClick={handleSaveNote}>Save</Button>
      ]}
    >
      <div className='flex items-center justify-center border-2 rounded-md'>
        <Input.TextArea rows={4} value={note} onChange={handleNoteChange} placeholder="Enter your note here" />
      </div>
      <div className='mt-3  border-2 rounded-md'>
        <Input
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>
      <div className='mt-3  border-2 rounded-md'>
        <Input
          placeholder="Treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
      </div>
      <div className='flex items-center justify-between space-x-3 mt-3  '>
        <div className=''>
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


export default AddNoteModal;
