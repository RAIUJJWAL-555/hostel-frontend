import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

// Icons placeholders (Unchanged)
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-10v10a1 1 0 001 1h3m-6 0a1 1 0 001-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 001 1h3z" /></svg>;
const AppsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ApproveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RoomIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 4h1m-5 4v-4m0 0h-2M9 16V9m10 7v-2m-7 2v-4m-5 4v-2" /></svg>;
const AllotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;


// ⭐ NavItems now use 'path' keys for routing
// Using absolute paths to ensure correct routing regardless of current nested level
const navItems = [
    { name: 'Home', path: '/admin/dashboard', end: true, icon: AppsIcon },
    { name: 'Complaints', path: '/admin/dashboard/complaints', icon: AppsIcon },
    { name: 'Fee Status', path: '/admin/dashboard/fees', icon: ApproveIcon },
    { name: 'Room Inventory', path: '/admin/dashboard/inventory', icon: RoomIcon },
    { name: 'Room Allotment', path: '/admin/dashboard/allotment', icon: AllotIcon },
    { name: 'Notice Board', path: '/admin/dashboard/notices', icon: BellIcon },
];

const AdminSidebar = ({ onLogout, isMobileOpen, onClose, isExpanded, onToggleExpand, adminName }) => {
    
    // Logic for display name (full name vs initial)
    const displayName = adminName || 'Admin';
    const finalDisplayName = isExpanded ? displayName : displayName.charAt(0);

    const [isMobile, setIsMobile] = useState(false); // Default to false to avoid SSR/hydration issues

    useEffect(() => {
        // Update isMobile on mount
        setIsMobile(window.innerWidth < 1024);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mobile Sidebar Variants
    const sidebarVariants = {
        desktop: { 
            width: isExpanded ? 280 : 80,
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        mobileOpen: { 
            width: 280,
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        mobileClosed: { 
            width: 280,
            x: "-100%",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className={`fixed top-0 left-0 h-screen p-4 flex flex-col justify-between 
                            bg-gray-900 text-white shadow-2xl z-50 transition-all duration-300
                            lg:translate-x-0 
                            ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
                            ${isExpanded ? 'w-64' : 'w-20'}
                           `}
                style={{ position: 'fixed', height: '100vh', zIndex: 50 }}
            >
                {/* 1. COLLAPSE TOGGLE BUTTON (Desktop Only) */}
                <button 
                    onClick={onToggleExpand} 
                    className="hidden lg:flex absolute top-4 -right-3 z-50 p-1 
                               bg-indigo-600 text-white rounded-full shadow-lg 
                               hover:bg-indigo-700 transition duration-300"
                    aria-label="Toggle Sidebar"
                >
                    <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        animate={{ rotate: isExpanded ? 0 : 180 }}
                    >
                         <polyline points="15 18 9 12 15 6"></polyline>
                    </motion.svg>
                </button>

                {/* Mobile Close Button */}
                <button 
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-gray-700 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Logo/Title Section */}
                <div className="text-3xl font-extrabold text-indigo-400 mb-10 border-b border-gray-700 pb-4 overflow-hidden whitespace-nowrap">
                    {isExpanded ? (
                        <>
                            Hostel<span className="text-indigo-200">Admin</span>
                            <p className="text-xs font-light text-gray-500 mt-1">Management Portal</p>
                        </>
                    ) : (
                        <span className='text-4xl pl-2'>A</span>
                    )}
                </div>
                
                {/* Navigation Links */}
                <nav className="space-y-2 flex-grow overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end}
                            onClick={onClose}
                            className={({ isActive }) => `
                                p-3 rounded-xl flex items-center space-x-3 cursor-pointer select-none 
                                font-medium overflow-hidden transition-all duration-300 no-underline
                                ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                                    : 'text-gray-300 hover:bg-indigo-700/50 hover:text-white' 
                                }
                                ${!isExpanded ? 'justify-center px-0' : ''}
                            `}
                        >
                            <span className={`text-xl flex-shrink-0`}>
                                <item.icon />
                            </span>
                            
                            {isExpanded && (
                                <span className="text-base whitespace-nowrap">
                                    {item.name}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Info & Logout Block */}
                <div className="mt-auto pt-6 border-t border-gray-700">
                    <div className="mb-4 p-3 bg-gray-700 rounded-lg overflow-hidden transition-all duration-300">
                        {/* Hide descriptive text when collapsed (not expanded) */}
                        {isExpanded && <p className="text-xs text-gray-400 mb-1">Logged in as:</p>} 
                        <span className={`font-bold text-gray-50 ${!isExpanded ? 'text-xl flex justify-center' : 'text-base'}`}>
                            {finalDisplayName}
                        </span>
                    </div>

                    <motion.button
                        onClick={onLogout}
                        className={`w-full flex items-center p-3 text-red-400 bg-gray-700 rounded-lg 
                                   hover:bg-red-600 hover:text-white transition-colors space-x-2 font-medium
                                   ${!isExpanded ? 'justify-center' : ''}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogoutIcon />
                        {isExpanded && <span>Logout</span>}
                    </motion.button>
                </div>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;