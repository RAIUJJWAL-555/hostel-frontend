// File: src/Admin/ComplaintDetailModal.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ComplaintDetailModal = ({ show, onClose, complaint }) => {
    if (!show || !complaint) return null;

    // Helper to format date/time
    const filedDate = complaint.filedAt ? new Date(complaint.filedAt).toLocaleString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : 'N/A';
    
    // Helper to color-code status (using the same logic from ComplaintList)
    const getStatusClasses = (status) => {
        switch (status) {
            case 'Pending': return 'bg-red-50 text-red-700 font-bold';
            case 'In Progress': return 'bg-yellow-50 text-yellow-700 font-bold';
            case 'Resolved': return 'bg-green-50 text-green-700 font-bold';
            default: return 'bg-gray-50 text-gray-700 font-bold';
        }
    };

    return (
        <AnimatePresence>
            {/* Backdrop: Full screen, semi-transparent dark, blurs the background */}
            <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose} // Closing on outside click
            >
                {/* Modal Content Box */}
                <motion.div 
                    // ⭐ RESPONSIVENESS & ENHANCED STYLING:
                    className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-sm md:max-w-lg shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={e => e.stopPropagation()} // Stop closing when clicking inside
                >
                    {/* Header */}
                    <h3 className="text-3xl font-extrabold text-indigo-700 border-b-2 border-indigo-100 pb-3 mb-5">
                        Complaint Details
                    </h3>

                    {/* Basic Info Grid (Responsive Layout) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6 border p-4 bg-indigo-50/20 rounded-xl">
                        <p>
                            <span className="font-bold text-gray-700 block">Filed By:</span> 
                            <span className='text-base text-gray-800'>{complaint.studentName}</span>
                        </p>
                        <p>
                            <span className="font-bold text-gray-700 block">Room Allotted:</span> 
                            <span className='text-base text-gray-800'>{complaint.roomAllotted}</span>
                        </p>
                        <p>
                            <span className="font-bold text-gray-700 block">Category:</span> 
                            <span className='text-base text-indigo-600 font-semibold'>{complaint.category}</span>
                        </p>
                        <p>
                            <span className="font-bold text-gray-700 block">Filed At:</span> 
                            <span className='text-sm text-gray-600'>{filedDate}</span>
                        </p>
                    </div>

                    {/* Subject and Status */}
                    <div className="space-y-3 mb-6">
                        <p className="text-xl font-extrabold text-gray-900">Subject: {complaint.subject}</p>
                        
                        {/* Status Badge */}
                        <span className={`inline-block px-4 py-1 text-sm rounded-full ${getStatusClasses(complaint.status)}`}>
                            Status: {complaint.status}
                        </span>
                    </div>
                    
                    {/* Full Details Section */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                        <h4 className="font-bold text-gray-700 mb-2 border-b pb-1">Full Description:</h4>
                        <p className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                            {complaint.details}
                        </p>
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={onClose}
                        className="mt-8 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg"
                    >
                        Close Details
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ComplaintDetailModal;