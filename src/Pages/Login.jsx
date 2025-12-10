import React from 'react'
import Header from '../Component/GeneralStudent/Header'
import LoginForm from '../Component/GeneralStudent/LoginForm'
import Footer from '../Component/GeneralStudent/Footer'

const Login = () => {
  return (
    <div className="transition-colors duration-300">
      <Header/>
      <LoginForm/>
      <Footer/>
    </div>
  )
}

export default Login
