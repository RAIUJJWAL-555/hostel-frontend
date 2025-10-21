import React from 'react'
import Header from '../Component/GeneralStudent/Header'
import HostelIntroduction from '../Component/GeneralStudent/HostelIntroduction'
import HostelFee from '../Component/GeneralStudent/HostelFee'
import Welcome from '../Component/GeneralStudent/Welcome'
import Footer from '../Component/GeneralStudent/Footer'
import Facilities from '../Component/GeneralStudent/Facilities'

const Home = () => {
  return (
    <div>
      <Header/>
      <Welcome/>
      <HostelIntroduction/>
      <Facilities/>
      <HostelFee/>
      <Footer/>
      
    </div>
  )
}

export default Home
