// File: src/Student/ConceptualPlaceholders.jsx (A single file containing all placeholders)

import React from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Home, Activity } from 'lucide-react';

// --- 1. Header Component Placeholder ---
export const Header = ({ studentName, roomNumber, studentPhotoUrl }) => (
    <div className='w-full bg-white border-b-4 border-indigo-600 text-gray-800 flex items-center justify-between p-4 rounded-xl shadow-lg mb-6'>
      <div className='flex items-center'>
        <div className='w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3 flex-shrink-0'>
          <User size={24} />
        </div>
        <h1 className='text-xl md:text-2xl font-extrabold truncate'>
          👋 Welcome, <span className='text-indigo-700'>{studentName}</span>!
        </h1>
      </div>
      <div className='hidden sm:flex items-center space-x-2 text-sm text-gray-600'>
        <Home size={16} className='text-indigo-500'/>
        <span>Room: <span className='font-semibold text-gray-800'>{roomNumber}</span></span>
      </div>
    </div>
);

// --- 2. StatCard Component Placeholder ---
const colorClasses = {
    green: 'bg-green-100 text-green-700 border-green-300',
    red: 'bg-red-100 text-red-700 border-red-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    blue: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    gray: 'bg-gray-100 text-gray-700 border-gray-300',
};
export const StatCard = ({ title, value, icon, color, variants }) => (
    <motion.div 
        className={`p-4 rounded-xl shadow-md border flex items-center justify-between ${colorClasses[color]}`}
        variants={variants}
    >
        <div>
            <p className="text-sm font-medium opacity-75">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
    </motion.div>
);

// --- 3. MainCard Component Placeholder ---
export const MainCard = ({ title, children, className, variants }) => (
    <motion.div 
        className={`bg-white shadow-xl rounded-xl p-6 border border-gray-100 ${className}`}
        variants={variants}
    >
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
        {children}
    </motion.div>
);

// --- 4. ProfileCard Component Placeholder ---
export const ProfileCard = ({ studentData }) => (
    <div className="space-y-3 text-sm">
        <p><strong>App No:</strong> <span className='font-mono text-indigo-600'>{studentData.applicationNumber}</span></p>
        <p><strong>Branch:</strong> {studentData.branch}</p>
        <p><strong>Year:</strong> {studentData.year}</p>
        <p><strong>DOB:</strong> {studentData.dob}</p>
        <p><strong>Email:</strong> {studentData.email}</p>
        <p className='pt-2 border-t mt-4'><strong>Fee Due Date:</strong> <span className='text-red-600 font-semibold'>{studentData.feeDueDate || 'N/A'}</span></p>
    </div>
);

// --- 5. NoticeList Component Placeholder ---
const notices = [
    { id: 1, text: "Mess timing changes effective 15th Oct. Check the dining hall notice board.", date: "Oct 1" },
    { id: 2, text: "Submit fee receipts by this weekend to avoid penalties.", date: "Sep 25" },
    { id: 3, text: "Room inspection for A block is scheduled for 10th Oct.", date: "Sep 20" },
];
export const NoticeList = () => (
    <ul className="space-y-3">
        {notices.map(notice => (
            <motion.li 
                key={notice.id} 
                className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex justify-between items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-gray-800 text-sm font-medium">{notice.text}</p>
                <span className="text-xs text-indigo-600 whitespace-nowrap ml-4">{notice.date}</span>
            </motion.li>
        ))}
    </ul>
);