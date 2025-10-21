import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, variants }) => {
    return (
        <motion.div 
            // Tailwind Classes for Card Styling
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-4 cursor-pointer"
            
            // Framer Motion Animation
            variants={variants}
            whileHover={{ 
                scale: 1.03,         // Scale up slightly
                y: -5,               // Lift up 5px
                boxShadow: "0 20px 30px rgba(0,0,0,0.08)", // More pronounced shadow on hover
                transition: { type: "spring", stiffness: 300 } // Smooth spring effect
            }}
        >
            <div className="text-3xl text-blue-500">{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            </div>
        </motion.div>
    );
};

export default StatCard;