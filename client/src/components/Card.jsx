import React from 'react'

const Card = () => {
  return (
    <div className=' '>
        <div className='flex flex-col bg-white rounded-lg shadow-lg overflow-hidden  '>
          <div className='overflow-hidden'>
          <img src="https://th.bing.com/th/id/OIP.0_yGb353J_SPSma7_uTmzQHaEK?pid=ImgDet&rs=1" alt="" /> 
        
        <div className='py-3 mx-5'>
            <h1 className='font-inter font-medium text-blue-500'>29,July 2023 </h1>
        </div>

        <h1 className='text-xl font-bold mx-5'>
           We Believe in great ideas, and deeds.
        </h1>

        <p className='text-sm leading-7 my-3 font-light opacity-90 mx-5 '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing
        </p>
        <div className="font-inter mx-5 mb-5 text-center font-medium bg-[#0F5BFF] text-white px-4 py-2 rounded-md ">
          Read More
        </div>
          </div>


        </div>
      
    </div>
  )
}

export default Card
