// import React from 'react'
// import NotificationBanner from './NotificationBanner'
// import gpg_logo_no_bg from '../../assets/gpg_logo_no_bg.png'
// import Navbar from './Navbar'

// const Header = () => {
//   return (
//     <div className='border-b-4'>
//       <NotificationBanner/>
//       <div className='w-full bg-[#1F2A44] text-white flex flex-row justify-between  items-center p-2 '>
//         <div className='flex items-center p-3'>
//           <img src={gpg_logo_no_bg} alt="" className='w-20 md:w-28 '/>
//         <h1 className='px-4 text-[15px]  md:text-lg lg:text-xl  font-bold'>Government Polytechnic Ghaziabad Hostel <span className='block font-medium md:text-center text-sm italic '>(Aicte registered, 1998 established)</span></h1>
//         </div>
//         <Navbar/>
//       </div>
      
//     </div>
//   )
// }

// export default Header
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

// --- Placeholder Components ---
const NotificationBanner = () => (
    <div className="bg-cyan-500 text-center py-2 text-white text-sm font-semibold">
        <span>Announcements: New semester starts next month!</span>
    </div>
);

// --- SVG Icons ---
const MenuIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronDownIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);


const InteractiveHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileRegisterOpen, setIsMobileRegisterOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMobileRegisterOpen(false);
  }

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ADMINISTRATION', path: '/admin/staff' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const registerSubItems = [
      { name: 'Admin', path: '/register/admin' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <NotificationBanner/>
      <div className={`w-full bg-[#1F2A44] text-white transition-all duration-300 ${isScrolled ? 'bg-opacity-95 backdrop-blur-lg' : 'bg-opacity-100'}`}>
        <div className="container mx-auto flex items-center justify-between transition-all duration-300 px-4" style={{ height: isScrolled ? '70px' : '90px' }}>
          
          {/* Logo and Title Section */}
          <div className='flex items-center'>
            <div className={`bg-slate-50 rounded-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-14 h-14' : 'w-20 h-20'}`}>
              <svg className="w-8 h-8 text-[#1F2A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </div>
            <div className='ml-4'>
                <h1 className='text-base md:text-lg lg:text-xl font-bold'>Government Polytechnic Ghaziabad Hostel</h1>
                <p className='text-xs md:text-sm italic font-medium text-slate-300'>(Aicte registered, 1998 established)</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <NavLink to={item.path} className={({ isActive }) => 
                      `font-semibold tracking-wider transition-colors duration-300 pb-2 ${isActive ? 'text-cyan-400' : 'hover:text-cyan-400'}`
                    }>
                    {item.name}
                  </NavLink>
                  <span className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </li>
              ))}

              <li className="relative group">
                <button className="flex items-center font-semibold tracking-wider text-slate-50 hover:text-cyan-400 transition-colors duration-300 pb-2">
                  REGISTER
                  <ChevronDownIcon className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                 <span className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    {registerSubItems.map(item => (
                         <Link key={item.name} to={item.path} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-cyan-50 hover:text-cyan-600">
                            {item.name}
                         </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  LOGIN
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none" aria-label="Open menu">
              <div className="w-7 h-7 relative transition-transform duration-300" style={{ transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none' }}>
                {isMobileMenuOpen ? <CloseIcon className="w-full h-full" /> : <MenuIcon className="w-full h-full" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl z-40 transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Menu</h2>
                 <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu"><CloseIcon className="w-7 h-7 text-slate-600"/></button>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item, index) => (
                    <NavLink key={item.name} to={item.path} onClick={closeAllMenus} 
                    className={({ isActive }) => `block py-3 px-4 rounded-md font-medium text-lg transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} ${isActive ? 'text-cyan-600 bg-slate-100' : 'text-slate-700 hover:bg-slate-100'}`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}>
                        {item.name}
                    </NavLink>
                ))}
                 <div className={`transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: `${navItems.length * 100 + 300}ms` }}>
                    <button onClick={() => setIsMobileRegisterOpen(!isMobileRegisterOpen)} className="w-full flex justify-between items-center py-3 px-4 rounded-md font-medium text-lg text-slate-700 hover:bg-slate-100 transition-colors">
                        REGISTER
                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isMobileRegisterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileRegisterOpen ? 'max-h-40' : 'max-h-0'}`}>
                         <div className='pl-6 pt-2 flex flex-col space-y-1'>
                            {registerSubItems.map(item => (
                                <NavLink key={item.name} to={item.path} onClick={closeAllMenus} className={({ isActive }) => `block py-2 px-3 rounded-md font-medium text-base transition-colors ${isActive ? 'text-cyan-600' : 'text-slate-600 hover:bg-slate-100'}`}>
                                    {item.name}
                                </NavLink>
                            ))}
                         </div>
                    </div>
                </div>
                <NavLink to="/login" onClick={closeAllMenus} 
                className={({ isActive }) => `block py-3 px-4 rounded-md font-medium text-lg transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} ${isActive ? 'text-cyan-600 bg-slate-100' : 'text-slate-700 hover:bg-slate-100'}`}
                style={{ transitionDelay: `${(navItems.length + 1) * 100 + 300}ms` }}>
                    LOGIN
                </NavLink>
            </nav>
        </div>
      </div>
       {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-30 transition-opacity duration-500" aria-hidden="true"></div>}
    </header>
  );
};

export default InteractiveHeader;

