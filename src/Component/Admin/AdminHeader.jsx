import React from 'react';
import { motion } from 'framer-motion';

// AdminHeader अब userName prop स्वीकार करता है
const AdminHeader = ({ userName = "Admin" }) => { 
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      // ⭐ RESPONSIVE CLASSES APPLIED:
      // Removed fixed mb-6 margin (will be controlled by parent Dashboard)
      // Cleaned up border/shadow to match new aesthetic
      className='w-full bg-white border-b-4 border-indigo-600 text-gray-800 
                 flex items-center justify-between p-3 md:p-4 
                 rounded-xl shadow-lg border border-gray-100'
    >
      <div className='flex items-center min-w-0'>
        {/* Placeholder for Logo - Ensures it remains visible */}
        <div className='w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-full 
                        flex items-center justify-center text-white font-bold 
                        text-md md:text-xl mr-2 md:mr-3 flex-shrink-0'>
          A
        </div>
        
        {/* Welcome Message with User's Name */}
        <h1 className='text-base md:text-xl font-extrabold truncate'>
          {/* Truncate ensures long names don't overflow on small screens */}
          👋 Welcome, <span className='text-indigo-700'>{userName}</span>!
        </h1>
      </div>
      
      {/* Logged-in Info - Hidden on very small screens (sm) */}
      <div className='hidden sm:block text-sm text-gray-500 flex-shrink-0 ml-4'>
        Logged in: <span className='font-semibold'>{userName}</span>
      </div>
    </motion.div>
  );
};

export default AdminHeader;