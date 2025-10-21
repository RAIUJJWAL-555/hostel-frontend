import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

// Define the Base URL constant for API calls
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`; 

// ⭐ ENHANCED ComplaintDetailModal Placeholder (Responsive & Themed)
const ComplaintDetailModal = ({ show, onClose, complaint }) => {
    if (!show || !complaint) return null;

    // Format the date/time for display
    const filedDate = complaint.filedAt ? new Date(complaint.filedAt).toLocaleString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : 'N/A';

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg md:max-w-2xl transform transition-all duration-300"
            >
                <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-indigo-700 leading-tight">
                    {complaint.subject}
                </h3>
                
                {/* Metadata Row */}
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-gray-600 mb-6 border-y py-3 border-gray-100">
                     <span className="font-bold text-gray-800">Category: <span className="font-normal text-indigo-600">{complaint.category}</span></span>
                     <span className="font-bold text-gray-800">Room: <span className="font-normal">{complaint.roomAllotted || 'N/A'}</span></span>
                     <span className="font-bold text-gray-800">Student: <span className="font-normal">{complaint.studentName}</span></span>
                     <span className="font-bold text-gray-800">Filed On: <span className="font-normal">{filedDate}</span></span>
                </div>

                {/* Details Body */}
                <p className="text-sm md:text-base text-gray-700 mb-6 whitespace-pre-wrap leading-relaxed border p-4 bg-gray-50 rounded-lg max-h-80 overflow-y-auto shadow-inner">
                    <span className="font-semibold text-gray-800 mb-2 block">Full Description:</span>
                    {complaint.details}
                </p>

                {/* Status and Action */}
                <div className="flex justify-between items-center pt-4">
                    <span className={`px-4 py-1 text-sm font-bold rounded-full ${getStatusClasses(complaint.status)}`}>
                        Current Status: {complaint.status}
                    </span>
                    <button 
                        onClick={onClose} 
                        className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition duration-200 font-semibold shadow-md"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
// ⭐ END ENHANCED PLACEHOLDER

// Helper function to color-code status (Unchanged but using Indigo theme)
const getStatusClasses = (status) => {
    switch (status) {
        case 'Pending': return 'bg-red-100 text-red-700 border border-red-300';
        case 'In Progress': return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
        case 'Resolved': return 'bg-green-100 text-green-700 border border-green-300';
        default: return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
};

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const handleViewDetails = (complaint) => {
        setSelectedComplaint(complaint);
        setShowModal(true);
    };

    const fetchComplaints = async () => {
        // ... (API fetching logic remains the same)
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}/hostel/complaints`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch complaints.');
            }
            // Sorting complaints: Pending first, then In Progress, then Resolved
            const sortedComplaints = data.sort((a, b) => {
                const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Resolved': 3 };
                return statusOrder[a.status] - statusOrder[b.status];
            });

            setComplaints(sortedComplaints);
        } catch (err) {
            setError(err.message);
            toast.error(`Error fetching complaints: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        // ... (API update logic remains the same)
        try {
            const res = await fetch(`${BASE_URL}/hostel/complaints/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || `Failed to set status to ${newStatus}`);
            }

            // State Synchronization: Update and re-sort the local list
            setComplaints(prevComplaints => {
                const updatedList = prevComplaints.map(c => 
                    c._id === id ? { ...c, status: newStatus } : c
                );
                // Re-sort the list after updating
                const statusOrder = { 'Pending': 1, 'In Progress': 2, 'Resolved': 3 };
                return updatedList.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
            });

            toast.success(`Status updated to ${newStatus}!`);

        } catch (err) {
            console.error('Update Error:', err);
            toast.error(`Failed to update status: ${err.message}`);
        }
    };
    
    // --- Loading and Error States (Enhanced Styling) ---
    if (loading) return <p className="p-8 text-center text-xl font-semibold text-indigo-600">Fetching active complaints...</p>;
    if (error) return <p className="p-8 text-center text-xl font-semibold text-red-600 border border-red-200 rounded-lg bg-red-50">Error: Could not load complaints. {error}</p>;

    // --- Main Component Render ---
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">Complaint Management Dashboard</h2>
            <p className="text-base text-gray-600 mb-8">Showing <span className="font-bold text-indigo-600">{complaints.length}</span> active and recent complaints.</p>
            
            {complaints.length === 0 && (
                <p className="px-6 py-8 text-center text-lg text-gray-500 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                    🎉 Great! No pending complaints found.
                </p>
            )}

            {/* ⭐ RESPONSIVENESS: overflow-x-auto for horizontal scrolling on mobile */}
            <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    
                    {/* Table Header: Consistent Indigo Styling */}
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-xl">Student / Room</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Filed At</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {complaints.map((c) => (
                            <motion.tr key={c._id} className="hover:bg-indigo-50 transition-colors" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-semibold text-gray-900">{c.studentName}</div>
                                    <div className="text-xs text-gray-500">Room: {c.roomAllotted}</div>
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.category}</td>
                                
                                {/* Subject with Click Action */}
                                <td 
                                    className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-800 underline cursor-pointer font-medium max-w-xs truncate" 
                                    title="Click to view full details"
                                    onClick={() => handleViewDetails(c)}
                                >
                                    {c.subject}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(c.filedAt).toLocaleDateString('en-IN')}
                                </td>
                                
                                {/* Status Badge */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClasses(c.status)}`}>
                                        {c.status}
                                    </span>
                                </td>
                                
                                {/* ⭐ ENHANCEMENT: Actions - Adjusted padding and text size for better mobile tap target */}
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2 md:space-x-3">
                                    {/* Start Button */}
                                    <button 
                                        onClick={() => handleStatusUpdate(c._id, 'In Progress')} 
                                        className={`px-2 py-1 text-xs md:text-sm rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-700 transition-colors disabled:text-gray-400 disabled:bg-gray-50 disabled:opacity-70`}
                                        title="Mark In Progress"
                                        disabled={c.status !== 'Pending'} 
                                    >
                                        Start
                                    </button>
                                    
                                    {/* Resolve Button */}
                                    <button 
                                        onClick={() => handleStatusUpdate(c._id, 'Resolved')} 
                                        className="px-2 py-1 text-xs md:text-sm rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors disabled:text-gray-400 disabled:bg-gray-50 disabled:opacity-70"
                                        title="Mark Resolved"
                                        // Allow resolving from In Progress or Pending (simplified logic for quick resolution)
                                        disabled={c.status === 'Resolved'} 
                                    >
                                        Resolve
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL COMPONENT RENDER */}
            <AnimatePresence>
                {showModal && (
                    <ComplaintDetailModal 
                        show={showModal} 
                        onClose={() => setShowModal(false)} 
                        complaint={selectedComplaint} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ComplaintList;