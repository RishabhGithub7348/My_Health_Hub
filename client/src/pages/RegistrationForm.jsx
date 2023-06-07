import React from 'react'
import {pic} from "../images"
import {Form} from "../components"

const RegistrationForm = () => {
  return (
    <div className='w-full h-full bg-white p-3 flex items-center flex-col '>
             <>
           <div className='flex items-center flex-col mt-4 w-[1020px] bg-white rounded-lg  p-2'>
            <div className='grid grid-cols-6  gap-36'>
              <div className='col-span-3'>
              <div className='w-full h-full'>
              <img src={pic} alt="" className='h-[550px] object-contain' />
              </div>
              </div>
              <div className='col-span-3'>
              <Form/>
              </div>
            </div>
           </div>
          </>

    </div>
  )
}

export default RegistrationForm
