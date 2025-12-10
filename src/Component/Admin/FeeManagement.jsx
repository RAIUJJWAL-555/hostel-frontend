import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Define the Base URL constant for API calls
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`; 

const FeeManagement = () => {
    const [feeRecords, setFeeRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingApp, setEditingApp] = useState(null); 
    const [newMonthsDue, setNewMonthsDue] = useState(0);

    const fetchFeeRecords = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/hostel/fees`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to fetch fee records');
            setFeeRecords(data); 
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (appNo, updates) => {
        try {
            const res = await fetch(`${BASE_URL}/hostel/fees/${appNo}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to update status on server.');
            
            setFeeRecords(prev => prev.map(rec => 
                // Ensure we merge the update correctly (data.student contains the updated record)
                rec.applicationNumber === appNo ? { ...rec, ...data.student } : rec
            ));
            
            toast.success(`Fee details for ${appNo} updated!`);
            setEditingApp(null); // Exit edit mode
            setNewMonthsDue(0); // Reset input
            
        } catch (error) {
            toast.error(`Update failed: ${error.message}`);
        }
    };
    
    // Function to handle status toggle (Paid <-> Pending)
    const handleToggleStatus = (appNo, currentStatus) => {
        const newStatus = currentStatus === 'Paid' ? 'Pending' : 'Paid';
        handleUpdate(appNo, { feeStatus: newStatus });
    };

    // Function to handle the actual monthsDue update
    const handleSaveMonthsDue = (record) => {
        if (newMonthsDue < 0 || isNaN(newMonthsDue)) {
            return toast.error("Months due must be a non-negative number.");
        }
        // This update will trigger the server to recalculate feeAmountDue
        handleUpdate(record.applicationNumber, { monthsDue: newMonthsDue });
    };


    useEffect(() => {
        fetchFeeRecords();
    }, []);

    if (loading) return <p className="text-center p-8 text-xl font-semibold text-indigo-600">Loading Fee Records...</p>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-3xl font-extrabold text-indigo-700">Fee Management Portal</h2>
            
            {/* ⭐ RESPONSIVENESS: Mobile Card Layout */}
            <div className="grid grid-cols-1 gap-6 md:hidden">
                {feeRecords.map(record => {
                    const formattedDueDate = record.feeDueDate 
                        ? new Date(record.feeDueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
                        : 'N/A';
                    
                    const isOverdue = (record.feeStatus !== 'Paid') && record.feeDueDate && new Date(record.feeDueDate) < new Date();
                    
                    const statusColor = record.feeStatus === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : isOverdue 
                        ? 'bg-red-600 text-white font-bold' 
                        : 'bg-yellow-100 text-yellow-800';

                    return (
                        <motion.div
                            key={`mobile-${record.applicationNumber}`}
                            className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col space-y-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{record.name}</h3>
                                    <p className="text-xs text-indigo-600 font-mono">{record.applicationNumber}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full border ${statusColor}`}>
                                    {record.feeStatus || (isOverdue ? 'OVERDUE' : 'Pending')}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm border-t border-b border-gray-50 py-3">
                                <div>
                                    <span className="text-xs text-gray-500 block">Room</span>
                                    <span className="font-semibold">{record.roomAllotted || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 block">Fee / Month</span>
                                    <span className="font-semibold">₹{record.messFeePerMonth || '3500'}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-xs text-gray-500 block">Total Due</span>
                                    <span className="text-xl font-extrabold text-red-600">
                                        ₹{record.feeAmountDue ? record.feeAmountDue.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 block">Due Date</span>
                                    <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>{formattedDueDate}</span>
                                </div>
                             </div>

                             {/* Editable Months Due Section */}
                            <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-700 uppercase">Months Due:</span>
                                {editingApp === record.applicationNumber ? (
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            min="0"
                                            value={newMonthsDue}
                                            onChange={(e) => setNewMonthsDue(parseInt(e.target.value) || 0)}
                                            className="w-16 border border-indigo-300 rounded text-center p-1 text-sm focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <button onClick={() => handleSaveMonthsDue(record)} className="text-green-600 font-bold text-xs p-1 border border-green-200 rounded bg-white">Save</button>
                                        <button onClick={() => setEditingApp(null)} className="text-gray-500 font-bold text-xs p-1 border border-gray-200 rounded bg-white">X</button>
                                    </div>
                                ) : (
                                    <div className="flex items-center cursor-pointer" onClick={() => {
                                        setEditingApp(record.applicationNumber);
                                        setNewMonthsDue(record.monthsDue || 0);
                                    }}>
                                        <span className="text-lg font-bold text-indigo-700 mr-2">{record.monthsDue || 0}</span>
                                        <span className="text-xs text-indigo-400 underline">Edit</span>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => handleToggleStatus(record.applicationNumber, record.feeStatus)}
                                disabled={record.feeStatus === 'Paid'}
                                className={`w-full py-2.5 rounded-lg text-white font-semibold shadow-sm transition-colors ${record.feeStatus === 'Paid' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                            >
                                {record.feeStatus === 'Paid' ? 'Paid' : 'Mark as Paid'}
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* ⭐ RESPONSIVENESS: Desktop Table Layout (Visible on md+) */}
            <div className="hidden md:block overflow-x-auto shadow-2xl rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    
                    {/* ⭐ ENHANCED HEADER STYLING (Indigo Theme) */}
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Student Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">App No.</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Room</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Fee / Mo.</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Months Due</th> 
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Total Due</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Due Date</th> 
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {feeRecords.map(record => {
                            const formattedDueDate = record.feeDueDate 
                                ? new Date(record.feeDueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
                                : 'N/A';
                            
                            const isOverdue = (record.feeStatus !== 'Paid') && record.feeDueDate && new Date(record.feeDueDate) < new Date();
                            
                            // ⭐ ENHANCED STATUS COLORS
                            const statusColor = record.feeStatus === 'Paid' 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : isOverdue 
                                ? 'bg-red-600 text-white font-bold border-red-700' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200';

                            return (
                                <motion.tr 
                                    key={record.applicationNumber} 
                                    className="bg-white border-b hover:bg-indigo-50 transition-colors text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{record.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-indigo-600 font-mono">{record.applicationNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{record.roomAllotted || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">₹{record.messFeePerMonth || '3500'}</td>

                                    {/* Editable Months Due */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingApp === record.applicationNumber ? (
                                            // ⭐ ENHANCED EDIT MODE STYLING
                                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={newMonthsDue}
                                                    onChange={(e) => setNewMonthsDue(parseInt(e.target.value) || 0)}
                                                    className="w-16 border-2 border-indigo-400 rounded-md text-center p-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                                                />
                                                <button 
                                                    onClick={() => handleSaveMonthsDue(record)}
                                                    className="bg-indigo-600 text-white px-2 py-1 rounded-md text-xs hover:bg-indigo-700 transition w-full sm:w-auto"
                                                >
                                                    Save
                                                </button>
                                                <button 
                                                    onClick={() => setEditingApp(null)}
                                                    className="bg-gray-400 text-white px-2 py-1 rounded-md text-xs hover:bg-gray-500 transition w-full sm:w-auto"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <span 
                                                className="text-indigo-600 font-extrabold cursor-pointer hover:underline p-1 block"
                                                onClick={() => {
                                                    setEditingApp(record.applicationNumber);
                                                    setNewMonthsDue(record.monthsDue || 0);
                                                }}
                                            >
                                                {record.monthsDue || 0}
                                            </span>
                                        )}
                                    </td>
                                    
                                    {/* Total Due (Calculated) */}
                                    <td className="px-6 py-4 whitespace-nowrap font-extrabold text-lg text-red-600">
                                        ₹{record.feeAmountDue ? record.feeAmountDue.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}
                                    </td>
                                    
                                    <td className={`px-6 py-4 whitespace-nowrap font-medium text-sm ${isOverdue ? 'text-red-700 font-extrabold' : 'text-gray-600'}`}>
                                        {formattedDueDate}
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColor}`}>
                                            {record.feeStatus || (isOverdue ? 'OVERDUE' : 'Pending')}
                                        </span>
                                    </td>
                                    
                                    {/* Action Button */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button 
                                            onClick={() => handleToggleStatus(record.applicationNumber, record.feeStatus)}
                                            disabled={record.feeStatus === 'Paid'}
                                            className={`px-3 py-1 text-xs rounded-lg text-white font-medium transition shadow-md w-full max-w-[120px] ${record.feeStatus === 'Paid' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                                        >
                                            {record.feeStatus === 'Paid' ? 'Paid' : 'Mark Paid'}
                                        </button>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default FeeManagement;