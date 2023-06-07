import React,{useEffect,useState , useContext} from 'react'
import { BsPerson, } from "react-icons/bs";
import { AiOutlineSearch ,AiOutlinePlus, AiTwotoneBell} from "react-icons/ai";
import Badge from '@mui/material/Badge';
import { DatePicker, Space } from 'antd';
import { AddRecord} from "../components"
import { Input } from 'antd';
import { Button } from "@nextui-org/react";
import axios from 'axios';
import {  RecordDetail } from '../components';
import { UserContext } from '../context/userContext';

const Record = () => {
  
  const {records, setRecords , handleDownload, handleDeleteRecord} = useContext(UserContext);
  const [isrecordModalVisible, setIsrecordModalVisible] = useState(false);
  const [searchValues, setSearchValues] = useState({
    doctorName: '',
    treatment: '',
    filename: '',
    appointmentDate: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem('token');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchValues({ ...searchValues, [name]: value });
    handleSubmit();
  };
  
  const handleSubmit = async () => {
    try {
      const response = await axios.get('https://my-health-hub-9wxa.onrender.com/api/record-search', {
        params: searchValues
      });
      setRecords(response.data);
      setSearchResults(response.data);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  };
  
  


  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const handleAddRecord = () => {
    setIsrecordModalVisible(true);
  };

  const handleCancel = () => {
    setIsrecordModalVisible(false);
  };


  
  return (
    <>
    <div className='flex  items-center justify-between  '>
      <div className='flex  items-center gap-1 '>
       <div className='flex items-center'>
       <BsPerson  style={{color:'#2d3ed6', fontSize: 40} } />
       </div>
        <p className='font-inter font-bold text-3xl  text-slate-800  '>Daina Prince</p>
      </div>
      <div className='flex items-center '>
      <Input size="large" placeholder="Search" prefix={<AiOutlineSearch   />} className="w-full" />
      <div>
      <button className='bg-blue-700 p-0.5 rounded-full ml-6 h-15 '><AiOutlinePlus style={{color:'#d4d6e3', fontSize: 30}} >
      
      </AiOutlinePlus>
      
      
      </button>
      </div>  
      <div className='flex items-center  bg-white  z-10 rounded-full p-0.5 ml-4 border-2 border-blue-700 '>
      <Badge badgeContent={4} color="primary" >
      <AiTwotoneBell style={{color:'#484b51', fontSize: 30}} />
    </Badge>
      </div>
      </div>
    </div>
    <div className='w-full h-px mt-4 bg-slate-300' />
    
    <div className='grid grid-cols-8 gap-4'>
       <div className='col-span-6'>
        <div className='flex items-center justify-between mt-6'>
          <div>
            <p className='font-inter font-medium text-3xl  text-slate-800  '>Records Dashboard</p>
          </div>
          <div className='flex items-center justify-center w-1/5 '>
            <Button className='bg-blue-700 p-2 w-full flex items-center justify-center  text-white rounded  ml-6 h-15 '  onClick={handleAddRecord}>
              <AiOutlinePlus className='mr-3' style={{color:'#d4d6e3', fontSize: 30}} />
               Add Record
            </Button>
          </div>
          {isrecordModalVisible && (
        <AddRecord
          visible={isrecordModalVisible}
          onClose={handleCancel}
          // onSave={handleSaveNote}
          onCancel={handleCancel}
        />
      )}

        </div>
        {records.map((doc) => (
         <div key={doc.id}>
         <RecordDetail date={doc.appointmentDate} time={doc.appointmentTime} file={doc.filename} treatment={doc.treatment} doctorName={doc.doctorName} id ={doc._id} onDelete={handleDeleteRecord} onDownload={ handleDownload} tab="Medical Records" />
       </div>

))}
        
       </div>
  
       <div className='col-span-2 ml-3'>
         <div className='flex flex-col   border-2 p-2 rounded-md mt-6  w-11/12 bg-white '>
         <div className='flex justify-start ml-3'>
         <p className='font-inter font-bold text-lg text-slate-600'>Filter</p>
         </div>
         <div className='flex  mt-3  flex-col ml-3 '>
         <div className='flex justify-start'>
         <p className='font-inter  text-sm font-normal  text-slate-500'>Date</p>
         </div>
         <div className='mt-2 w-full'>
         <input  className='w-full border-2 outline-0 p-1 mr-2 rounded-md ' type="date" name="appointmentDate" value={searchValues.appointmentDate} onChange={handleInputChange} />
         </div>
         </div>

         <div className='flex  mt-3  flex-col ml-3 '>
         <div className='flex justify-start'>
         <p className='font-inter  text-sm font-normal  text-slate-500'>Dr. Name</p>

         </div>
         <div className='mt-2 flex items-center justify-center   w-full'>
         <input  className='w-full border-2 outline-0 p-1 mr-2 rounded-md ' type="text" name="doctorName" value={searchValues.doctorName} onChange={handleInputChange} />

         </div>
         </div>


         <div className='flex  mt-3  flex-col ml-3 '>
         <div className='flex justify-start'>
         <p className='font-inter  text-sm font-normal  text-slate-500'>Treatment</p>
         </div>
         <div className='mt-2 flex items-center justify-center  w-full'>
         <input className='w-full border-2 outline-0 mr-2 p-1 rounded-md ' type="text" name="treatment" value={searchValues.treatment} onChange={handleInputChange} />
         </div>
         </div>


         <div className='flex  mt-3  flex-col ml-3 '>
         <div className='flex justify-start'>
         <p className='font-inter  text-sm font-normal  text-slate-500'>File Name</p>
         </div>
         <div className='mt-2 flex items-center justify-center  w-full'>
         <input className='w-full border-2 outline-0 mr-2 p-1 rounded-md ' type="text" name="filename" value={searchValues.filename} onChange={handleInputChange} />
         </div>
         </div>
         <div className='mb-5'>
         </div>
         </div>
       </div>
      </div>   
    </>
  )
}

export default Record
