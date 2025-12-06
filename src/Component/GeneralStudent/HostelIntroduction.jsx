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
          <HI2/>
        </div>
      </div>
    </div>
  )
}

export default HostelIntroduction

