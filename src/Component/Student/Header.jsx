// File: src/Student/Header.jsx

import React from 'react';
import { motion } from 'framer-motion';

const headerVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// ⭐ UPDATED: Props के नाम बदलकर Dashboard.jsx से मैच किए गए हैं
const Header = ({ studentName, studentPhotoUrl, roomNumber }) => {
    
    // Default values set for safety and clarity
    const displayRoom = roomNumber || 'N/A';
    const displayName = studentName || 'Student';
    
    // Fallback for initials if the photo URL is the placeholder
    const initials = displayName.charAt(0).toUpperCase();


    return (
        <motion.header
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className="flex justify-between items-center py-4 mb-6 border-b border-gray-200"
        >
            {/* Left: Welcome & Room Info */}
            <div>
                <h2 className="text-3xl font-extrabold text-gray-800">
                    {/* ⭐ DYNAMIC NAME: studentName prop का उपयोग */}
                    Welcome back, <span className="text-blue-600">{displayName}!</span>
                </h2>
                <p className="text-lg text-gray-500 mt-1">
                    {/* ⭐ DYNAMIC ROOM: roomNumber prop का उपयोग */}
                    Room: <span className="font-semibold text-blue-500">{displayRoom}</span>
                </p>
            </div>

            {/* Right: Notifications and Profile */}
            <div className="flex items-center space-x-5">
                
                {/* Notification Icon (Unchanged) */}
                <motion.div
                    className="relative cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="text-2xl">🔔</span>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </motion.div>
                
                {/* Profile Avatar */}
                <motion.div
                    className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-blue-500 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <img 
                        src={studentPhotoUrl} 
                        alt={`${displayName} Profile`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.style.display = 'none'; // Hide broken image
                        }}
                    />
                    {/* Fallback Text for initials */}
                    {/* ⭐ UPDATED: Fallback हमेशा दिखेगा अगर इमेज लोड नहीं होती या placeholder URL है */}
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                        {initials}
                    </div>
                </motion.div>
            </div>
        </motion.header>
    );
};

export default Header;