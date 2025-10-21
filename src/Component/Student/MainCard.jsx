import React from 'react';
import { motion } from 'framer-motion';

const MainCard = ({ title, children, variants, className }) => {
    return (
        <motion.section
            // Combine custom classes with base Tailwind styling
            className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 ${className}`}
            
            // Framer Motion Animation
            variants={variants}
            initial="hidden"
            animate="visible"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                {title}
            </h2>
            {children}
        </motion.section>
    );
};

export default MainCard;