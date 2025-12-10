// File: src/Student/Sidebar.jsx (Final Polished Version with Desktop Collapse)

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ⭐ NEW ICON: Chevron for desktop collapse/expand
import { X, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'; 

import { NavLink } from 'react-router-dom';

const navItems = [
    { name: 'Home', icon: '🏠', path: '/student/dashboard', end: true },
    { name: 'Complaint box', icon: '📮', path: '/student/dashboard/complaint' },
    { name: 'Grades', icon: '📈', path: '/student/dashboard/grades', disabled: true },
    { name: 'Settings', icon: '⚙️', path: '/student/dashboard/settings', disabled: true },
];

const Sidebar = ({ 
    studentName, 
    onLogout, 
    isMobileOpen, 
    onClose,
    // ⭐ NEW PROPS for Desktop Collapse
    isCollapsed, 
    onToggleCollapse 
}) => {
    
    const displayName = studentName || 'Guest';
    const finalDisplayName = isCollapsed ? displayName.charAt(0) : displayName;

    // Determine the active state based on screen size for initial animation
    const initialAnimation = window.innerWidth >= 1024 ? "desktop" : "hidden";

    return (
        <>
            <motion.aside 
                className={`
                    fixed top-0 left-0 h-screen p-4 flex flex-col justify-between 
                    bg-gray-900 text-white shadow-2xl z-50 transition-all duration-300
                    
                    // ⭐ RESPONSIVE WIDTH:
                    // Mobile: Fixed 16rem (w-64)
                    // Desktop: Toggle between 16rem (w-64) and 4.5rem (w-18)
                    ${isCollapsed ? 'w-18' : 'w-64'} 
                    
                    lg:block lg:translate-x-0 
                    ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'} 
                `}
                variants={{
                    desktop: { 
                        width: isCollapsed ? '4.5rem' : '16rem', // Toggle width for desktop
                        opacity: 1, 
                        transition: { type: "tween", duration: 0.3 } 
                    },
                    hidden: { x: -256 }, 
                    visible: { x: 0, transition: { type: "tween", duration: 0.3 } }
                }}
                initial={initialAnimation} 
                animate={isMobileOpen ? "visible" : "desktop"}
            >
                {/* ⭐ 1. COLLAPSE TOGGLE BUTTON (Desktop Only) */}
                <button 
                    onClick={onToggleCollapse} 
                    className="hidden lg:flex absolute top-4 -right-3 z-50 p-1 
                               bg-indigo-600 text-white rounded-full shadow-lg 
                               hover:bg-indigo-700 transition duration-300"
                    aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>


                {/* Mobile Close Button (Still needed for mobile drawer) */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-400 lg:hidden p-1 rounded-full hover:bg-gray-700 transition"
                    aria-label="Close Menu"
                >
                    <X size={24} />
                </button>
                
                {/* Logo/Title Section */}
                <div className="text-3xl font-extrabold text-indigo-400 mb-10 border-b border-gray-700 pb-4 overflow-hidden">
                    {isCollapsed ? (
                        <span className='text-4xl'>H</span>
                    ) : (
                        <>
                            Hostel<span className="text-indigo-200">Portal</span>
                            <p className="text-xs font-light text-gray-500 mt-1">Student Dashboard</p>
                        </>
                    )}
                </div>
                
                {/* Navigation Section */}
                <nav className="space-y-2 flex-grow">
                    {navItems.map((item, index) => {
                         if (item.disabled) {
                            return (
                                <motion.div
                                    key={index}
                                    className={`p-3 rounded-xl flex items-center space-x-3 select-none 
                                                font-medium overflow-hidden transition-all duration-300 text-gray-600 cursor-not-allowed opacity-50`}
                                    initial={{ opacity: 0, x: -10 }} 
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * index }}
                                >
                                    <span className="text-xl flex-shrink-0">{item.icon}</span> 
                                    {!isCollapsed && <span className="text-base whitespace-nowrap">{item.name}</span>}
                                </motion.div>
                            );
                         }

                         return (
                            <NavLink
                                key={index}
                                to={item.path}
                                end={item.end}
                                onClick={onClose}
                                className={({ isActive }) => `
                                    p-3 rounded-xl flex items-center space-x-3 select-none 
                                    font-medium overflow-hidden transition-all duration-300 cursor-pointer no-underline
                                    ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                                        : 'text-gray-300 hover:bg-indigo-700/50 hover:text-white' 
                                    }
                                `}
                            >
                                <span className="text-xl flex-shrink-0">{item.icon}</span> 
                                {!isCollapsed && <span className="text-base whitespace-nowrap">{item.name}</span>}
                            </NavLink>
                         );
                    })}
                </nav>

                {/* User Info & Logout Block */}
                <div className="mt-auto pt-6 border-t border-gray-700">
                    <div className="mb-4 p-3 bg-gray-700 rounded-lg overflow-hidden transition-all duration-300">
                        {/* Hide descriptive text when collapsed */}
                        {!isCollapsed && <p className="text-xs text-gray-400 mb-1">Logged in as:</p>} 
                        <span className={`font-bold text-gray-50 ${isCollapsed ? 'text-xl' : 'text-base'}`}>
                            {finalDisplayName}
                        </span>
                    </div>
                    
                    {/* Logout Button (One instance, fixed styling) */}
                    <motion.button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center p-3 text-red-400 bg-gray-700 rounded-lg 
                                   hover:bg-red-600 hover:text-white transition-colors space-x-2 font-medium"
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogOut size={20} className='flex-shrink-0'/>
                        {/* Hide text when collapsed */}
                        {!isCollapsed && <span>Logout</span>}
                    </motion.button>
                </div>
            </motion.aside>

            {/* Mobile Backdrop Overlay */}
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
        </>
    );
};

export default Sidebar;