import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Define the Base URL constant for API calls
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const ComplaintBox = ({ studentData }) => {
    // State for form inputs
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
    const [category, setCategory] = useState('Room Maintenance');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Placeholder function for submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!subject || !details) {
            toast.error("Please fill out both the subject and details.");
            return;
        }

        setIsSubmitting(true);
        
        // ⭐ Define the data payload
        const complaintData = {
            studentId: studentData._id,
            studentName: studentData.name,
            applicationNumber: studentData.applicationNumber, 
            roomAllotted: studentData.roomAllotted || 'N/A', // Using roomAllotted from studentData
            category,
            subject,
            details
        };

        console.log('Payload being sent:', complaintData); 
        
        // --- Actual API Call to Save Complaint ---
        try {
            // ✅ URL UPDATED: Using BASE_URL for consistency
            const res = await fetch(`${BASE_URL}/student/complaints`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(complaintData),
            });
            
            const data = await res.json();

            if (!res.ok) {
                // If backend returns a non-200 status (like 400 or 500)
                throw new Error(data.message || "Complaint submission failed on the server.");
            }
            
            // Success Logic
            toast.success(`Complaint filed successfully! Tracking ID: ${data.complaint._id.slice(-6)}`);
            
            // Clear form
            setSubject('');
            setDetails('');
            setCategory('Room Maintenance');

        } catch (error) {
            console.error('Submission Error:', error);
            toast.error(`Failed to submit complaint: ${error.message}`);
            
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-white rounded-xl shadow-2xl"
        >
            <h2 className="text-3xl font-bold text-red-700 mb-6 border-b pb-3">File a New Complaint</h2>
            
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-sm text-yellow-800">
                <p>Logged in as: <strong>{studentData.name}</strong> (Room: <strong>{studentData.roomAllotted || 'N/A'}</strong>)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Category Selection */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        required
                        disabled={isSubmitting}
                    >
                        <option>Room Maintenance</option>
                        <option>Mess & Food</option>
                        <option>Washroom/Sanitation</option>
                        <option>Security & Safety</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Subject Line */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject / Title</label>
                    <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="E.g., Leaky tap in Room B-102"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        maxLength="100"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                
                {/* Complaint Details */}
                <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                    <textarea
                        id="details"
                        rows="5"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Provide full details of the issue (location, time, severity)."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        required
                        disabled={isSubmitting}
                    ></textarea>
                </div>

                {/* Submission Button */}
                <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ComplaintBox;
