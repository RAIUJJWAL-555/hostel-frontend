import React from 'react'
import ContactForm from './ContactForm'

const ContactTable = () => {
  return (
    <div className=' mt-10 w-[96vw] mx-auto  flex flex-col md:flex-row gap-6  '>
      <div className=' md:basis-[40%]   bg-gray-200 backdrop-blur-lg rounded-xl shadow-xl border  ' >
        <h1 className='text-center p-2 font-bold text-3xl bg-blue-950 text-white rounded-t-xl'>Contact Us</h1>
        <div className='grid mt-4 p-4 gap-2'>
          <div className=' flex  items-center bg-white/10 border border-white/20 rounded-lg shadow-md p-3 '>
            <div className='basis-[30%]  text-center text-2xl p-3  
            '><i className="ri-phone-fill"></i></div>
            <p className='basis-[70%] ml-2'>+31 520 452 7852</p>
          </div>
          <div className='flex  items-center bg-white/10 border border-white/20 rounded-lg shadow-md p-3 '>
            <div className='basis-[30%]  text-center text-2xl p-3  
            '><i className="ri-mail-fill"></i></div>
            <p  className='basis-[70%]  ' >gpghostel@ac.in</p>

          </div>
          <div className='flex  items-center bg-white/10 border border-white/20 rounded-lg shadow-md p-3 '>
            <div className='basis-[30%]  text-center text-2xl p-3  
            '><i className="ri-map-pin-5-fill"></i></div>
            <p  className='basis-[70%]  '>Shashrti nagar , ghaziabad , up , 200200</p>

          </div>
          <div className='flex  items-center bg-white/10 border border-white/20 rounded-lg shadow-md p-3 '>
            <div className='basis-[30%]  text-center text-2xl p-3  
            '><i className="ri-time-fill"></i></div>
            <p  className='basis-[70%]'>Office Timing : 10:00am - 2:00pm</p>

          </div>
        </div>
      </div>

      <div className=' basis-[60%]'>
        <ContactForm/>
        
      </div>
      
    </div>
  )
}

export default ContactTable
