import React from 'react'
import Card from './Card'

const Cards = () => {
  return (
   <div className='max-w-screen-lg mx-auto   '>
     <div className="flex justify-between items-center ">
       <div className='font-inter font-bold text-black'>
       <h1>Follow the latest articles and news </h1>
       </div>

       <div>
         <button className="font-inter font-medium bg-[#0F5BFF] text-white px-4 py-2 rounded-md">View All </button>
       </div>     
    </div>
    <div className='mt-8 flex max-w-screen-lg mx-auto   gap-8'>
      <Card/>
      <Card/>
      <Card/>
    </div>
   </div>
  )
}

export default Cards
