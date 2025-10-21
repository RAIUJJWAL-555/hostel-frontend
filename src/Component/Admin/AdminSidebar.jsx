import React, { useState } from 'react';
import { motion } from 'framer-motion';
// ❌ NavLink हटा दिया गया

// Icons placeholders (Unchanged)
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-10v10a1 1 0 001 1h3m-6 0a1 1 0 001-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 001 1h3z" /></svg>;
const AppsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ApproveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RoomIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 4h1m-5 4v-4m0 0h-2M9 16V9m10 7v-2m-7 2v-4m-5 4v-2" /></svg>;
const AllotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


// ⭐ NavItems अब paths के बजाय 'view' keys का उपयोग करते हैं
const linkVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 },
};
const navItems = [
    // 1. Home पर क्लिक करने पर 'applications' दिखे
    { name: 'Home', view: 'applications', icon: AppsIcon },
    
    // 2. Applications पर क्लिक करने पर भी 'applications' दिखे
    // { name: 'Applications', view: 'applications', icon: AppsIcon },
    
    // 3. NEW: Applications की जगह 'Complaints' का ऑप्शन
    { name: 'Complaints', view: 'complaints', icon: AppsIcon },
    
    // 4. Approved Students को हटा दिया गया या नीचे ले जाया गया (Optional: अगर Approved Students भी चाहिए, तो view: 'approved' रहने दें)
    // { name: 'Approved Students', view: 'approved', icon: ApproveIcon }, 
    
    // 5. Fee Status
    { name: 'Fee Status', view: 'fees', icon: ApproveIcon }, 
    
    // 6. Room Inventory
    { name: 'Room Inventory', view: 'inventory', icon: RoomIcon }, 
    
    // 7. Room Allotment
    { name: 'Room Allotment', view: 'allotment', icon: AllotIcon }, 
];

// ⭐ onNavigate और currentView props यहाँ प्राप्त करें
const AdminSidebar = ({ onLogout, currentView, onNavigate }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <motion.aside
            className="fixed top-0 left-0 h-full bg-[#1F2A44] text-white shadow-2xl z-40 flex flex-col pt-4 pb-4"
            animate={{ width: isExpanded ? 280 : 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Logo/Title Section (Unchanged) */}
            <div className="flex items-center p-4 border-b border-gray-700 h-20">
                {isExpanded && (
                    <motion.h1 
                        className="text-2xl font-extrabold text-blue-300 whitespace-nowrap overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Hostel Admin
                    </motion.h1>
                )}
                {!isExpanded && (
                    <span className="text-2xl font-extrabold text-blue-300 mx-auto">
                        A
                    </span>
                )}
            </div>
            

            {/* ⭐ Navigation Links (NavLink replaced with motion.button) */}
            <nav className="flex flex-col flex-grow mt-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <motion.button // 👈 NavLink replaced
                        key={item.name}
                        onClick={() => onNavigate(item.view)} // 👈 State update on click
                        className={`flex items-center transition-all duration-300 py-3 ${isExpanded ? 'px-6' : 'px-0 justify-center'} 
                        ${item.view === currentView ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                        }
                        whileHover={{ scale: 1.05 }}
                    >
                        <item.icon />
                        {isExpanded && (
                            <motion.span
                                className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                                variants={linkVariants}
                                initial={false}
                                animate={isExpanded ? "expanded" : "collapsed"}
                            >
                                {item.name}
                            </motion.span>
                        )}
                    </motion.button>
                ))}
            </nav>

            {/* Collapse/Toggle Button and Logout (Unchanged) */}
            <div className="mt-auto border-t border-gray-700 pt-4 flex flex-col space-y-2">
                {/* Toggle Button (Unchanged) */}
                <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`text-gray-300 hover:bg-gray-700 py-3 transition-colors duration-200 flex items-center ${isExpanded ? 'px-6 justify-end' : 'justify-center'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ rotate: isExpanded ? 180 : 0 }} 
                        transition={{ duration: 0.3 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12h.01" />
                    </motion.svg>
                </motion.button>

                {/* Logout Button (Unchanged) */}
                <motion.button
                    onClick={onLogout}
                    className={`flex items-center text-red-400 hover:bg-red-900 py-3 transition-colors duration-200 ${isExpanded ? 'px-6' : 'justify-center'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LogoutIcon />
                    {isExpanded && (
                        <motion.span 
                            className="ml-4 font-medium whitespace-nowrap overflow-hidden"
                            variants={linkVariants}
                            initial={false}
                            animate={isExpanded ? "expanded" : "collapsed"}
                        >
                            Logout
                        </motion.span>
                    )}
                </motion.button>
            </div>
        </motion.aside>
    );
};

export default AdminSidebar;