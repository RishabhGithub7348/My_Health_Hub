import React from 'react'
import {Header,Middle, Explore, Cards} from '../components'
import { FaArrowRight } from 'react-icons/fa';
import {pic, support, services, security} from "../images"

const Home = () => {
  return (
    <section className="max-w-7xl mx-auto ">
      {/* HealthCare is a platform where you can store your medical records and book appointments with doctors. */}
      <div className="flex flex-col ">
       <div className='grid grid-cols-4 gap-20'>
         <div className='col-span-2  ml-28'>
          <div className='flex flex-col  gap-4'>
           <div className='flex items-center justify-start text-center'>
            <p className='text-blue-700 text-2xl font-semibold'>Welcome to HealthCare</p>
           </div>
           <div className='w-[380px] mt-2'>
            <p className='text-slate-800 text-5xl leading-[3.4rem] font-bold'> For private clinics  and Medical centers</p>
           </div>
           <div>
            <p className='text-slate-700 text-xl font-medium'>HealthCare is a platform where you can store your medical records and book appointments with doctors.</p>
           </div>
            <div className='flex items-center gap-4 mt-4 '>
            <div className="flex items-center">
  <button className="flex items-center text-white text-lg font-medium bg-blue-700 px-6 py-3 rounded-full hover:bg-blue-500">
    <span className="mr-2">Get Started</span>
    <FaArrowRight className="text-base" />
  </button>
</div>

              <div className="flex  items-center gap-4 ">
  <p className="text-blue-900 text-lg font-semibold ml-4">Learn More </p>
  <span><FaArrowRight className="text-base text-blue-900" /></span>
</div>

            </div>
          </div>
         </div>
         <div className='col-span-2 ml-11'>
          <div className='h-[500px]'>
            <img src={pic} alt="" className='h-[500px] object-contain' />
          </div>
         </div>
       </div>
    
      </div>
      <div className=' flex items-center  mt-10  w-full'>
        <div className=' flex items-center bg-gradient-to-r from-blue-700 to-blue-400 p-3  py-20 w-full border-2 rounded-t-3xl'>
          <div className='flex items-center ml-20  mr-20  gap-28'>
            {/* <p className='text-white text-2xl font-semibold'>Why HealthCare?</p> */}
            <div className='flex items-center gap-6'>
              <div className='bg-white px-1 py-5 rounded-xl border'>
                 <img src={support} alt=""  className='w-[75px] h-[75px]' />
              </div>
              <div className='flex flex-col gap-1  w-[150px] justify-start'>
                <p className='text-white text-base font-semibold'>Why HealthCare?</p>
                <p className='text-white text-xs font-medium'>An easy to use online and directory that let you</p>
              </div>
            </div>

            <div className='flex items-center gap-6'>
              <div className='bg-white px-1 py-5 rounded-xl border'>
                 <img src={services} alt="" className='w-[75px] h-[75px]' />
              </div>
              <div className='flex flex-col gap-1  w-[150px] justify-start'>
                <p className='text-white text-base font-semibold'>Our Services</p>
                <p className='text-white text-xs font-medium'>It is a platform where you can store your medical records and book appointments with doctors.</p>
              </div>
            </div>

            <div className='flex items-center gap-6'>
              <div className='bg-white px-1 py-5 rounded-xl border'>
                 <img src={security} alt="" className='w-[75px] h-[75px]' />
              </div>
              <div className='flex flex-col gap-1  w-[150px] justify-start'>
                <p className='text-white text-base font-semibold'>Security</p>
                <p className='text-white text-xs font-medium'>we provide security of your records  </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
