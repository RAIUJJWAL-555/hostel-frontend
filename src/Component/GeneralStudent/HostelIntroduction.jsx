import React from 'react'
import gpg_hostel from '../../assets/gpg_hostel_img1.jpg'
import gpg_hostel_1 from '../../assets/gpg_hostel_img2.jpg'
import { hostelIntro , hostelIntro1 } from '../../assets/assest'
import hostelrules from './../../assets/GPG_hostel_rules.pdf'
import hostelEligiblity from './../../assets/gpg_eligibility.pdf'
import HI2 from './HI2'


const HostelIntroduction = () => {
  return (
    <div className=' w-[95vw] m-auto mt-3 h-full'>
      
      <div>
        <div className=' flex flex-col md:flex-row py-2 w-full gap-2 '>
          {/* <div className='bg-[#f0f8fb]  basis-7/10'>
          <h1 className='text-center font-bold text-xl lg:text-3xl'>Introduction</h1>
          <div className='p-6'>
            <img src={gpg_hostel} alt="" className=' float-none w-90  md:float-left h-auto md:mr-4 mb-2 rounded' />
            <p dangerouslySetInnerHTML={{__html:hostelIntro}} className='font-semibold'></p> 
            <p dangerouslySetInnerHTML={{__html:hostelIntro1}} className='font-semibold'  ></p>
          </div>
          </div> */}
          <HI2/>
          {/* <div className=' flex flex-col basis-3/10 gap-2'>
            <div className='bg-slate-400 flex-1 '>
              <h1 className='text-xl font-semibold bg-[#24037f] text-white py-3 text-center '>Notifications</h1>
              <div>
                <marquee behavior="scroll" direction="up">
                  <p>SC/ST students last day to apply for hostel extended to 15th October</p>
                  <p>Mess fees will be taken usinng cash only</p>
                </marquee>
              </div>
              
            </div>
            <div className='bg-red-300  md:block flex-1 '>
              <h1 className='text-xl font-semibold bg-[#f11515] text-white py-3 mb-3 text-center '>Important Links</h1>
              <a href={hostelrules} target="_blank" rel="noopener noreferrer" className=" text-white   rounded-full font-semibold hover:text-blue-700 block px-4">
                Download Rules & Regulation brochure
              </a>
              <a href={hostelEligiblity} target="_blank" rel="noopener noreferrer" className=" text-white   rounded-full font-semibold hover:text-blue-700 block px-4">
                Download Eligibility Criteria
              </a>
              <div> 
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default HostelIntroduction

