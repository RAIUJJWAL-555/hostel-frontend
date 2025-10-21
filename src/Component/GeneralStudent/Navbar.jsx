import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import menu_icon from '../../../src/assets/menu_icon.png';
import back from '../../../src/assets/back.png';
import menu from '../../../src/assets/menu.svg';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDesktopRegisterOpen, setIsDesktopRegisterOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div>
      <div className='flex mr-5'>
        {/* Sidebar for small screens */}
        <img
          onClick={() => setVisible(true)}
          src={menu}
          className='w-14 cursor-pointer sm:hidden'
          alt="Menu"
        />
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden z-50 bg-white transition-all ${
            visible ? 'w-[50%]' : 'w-0'
          }`}
        >
          <div className="flex bg- flex-col text-gray-600">
            <div
              onClick={() => setVisible(false)}
              className="bg-blue-950 flex items-center gap-4 p-3 cursor-pointer"
            >
              <img src={back} className='h-4 ' alt="" />
              <p className='text-gray-50'>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>
              <p>HOME</p>
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/admin/staff'>
              <p>ADMINISTRATION</p>
            </NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>
              <p>CONTACT</p>
            </NavLink>

            {/* Register Dropdown for Sidebar */}
            <div
              onClick={() => setIsRegisterOpen(!isRegisterOpen)}
              className='py-2 pl-6 border cursor-pointer flex justify-between items-center'
            >
              <p>REGISTER</p>
              <span className={`mr-4 transition-transform transform ${isRegisterOpen ? 'rotate-90' : 'rotate-0'}`}>
                <i className="ri-arrow-right-s-line"></i>
              </span>
            </div>
            {isRegisterOpen && (
              <div className='flex flex-col bg-gray-100'>
                <NavLink
                  onClick={() => { setVisible(false); setIsRegisterOpen(false); }}
                  className='py-2 pl-10 border'
                  to='/register/admin'
                >
                  <p>Admin</p>
                </NavLink>
                {/* <NavLink
                  onClick={() => { setVisible(false); setIsRegisterOpen(false); }}
                  className='py-2 pl-10 border'
                  to='/register/student'
                >
                  <p>Student</p>
                </NavLink> */}
              </div>
            )}
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/login'>
              <p>LOGIN</p>
            </NavLink>
          </div>
        </div>

        {/* Main navigation for larger screens */}
        <nav className='font-semibold cursor-pointer text-white-800'>
          <ul className='hidden md:flex space-x-2'>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <Link to='/admin/staff'>
              <li>Administration</li>
            </Link>
            <Link to='/contact'>
              <li>Contact</li>
            </Link>

            {/* Register Dropdown for Desktop */}
            <li
              className="relative group"
              onMouseEnter={() => setIsDesktopRegisterOpen(true)}
              onMouseLeave={() => setIsDesktopRegisterOpen(false)}
            >
              <div className='px-2'>Register</div>
              {isDesktopRegisterOpen && (
                <div className="absolute top-full left-0 bg-white text-gray-800 border rounded shadow-lg">
                  <Link
                    to="/register/admin"
                    className='block whitespace-nowrap px-4 py-2 hover:bg-gray-200'
                  >
                    Admin
                  </Link>
                  {/* <Link
                    to="/register/student"
                    className='block whitespace-nowrap px-4 py-2 hover:bg-gray-200'
                  >
                    Student
                  </Link> */}
                </div>
              )}
            </li>
            <Link to='/login'>
              <li>Login</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;