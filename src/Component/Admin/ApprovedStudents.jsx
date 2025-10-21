import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Row animation variant for ApprovedStudents table
const rowVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const ApprovedStudents = () => {
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchApprovedApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch applications');
      }
      // Filter for only approved applications
      const approvedData = data.filter(app => app.status === 'approved');
      setApprovedApplications(approvedData);
    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching approved applications: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedApplications();
  }, []); 

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        {/* ⭐ ENHANCEMENT: Clearer, bolder title */}
        <h2 className="text-2xl font-extrabold text-indigo-700">Approved Student Applications</h2>
      </div>

      <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ staggerChildren: 0.05 }}
      >
        {loading ? (
          <p className="text-center text-indigo-500 p-8 font-medium">Loading approved applications...</p>
        ) : error ? (
          <p className="text-center text-red-600 p-8 border border-red-200 bg-red-50 rounded-xl">Error: {error}</p>
        ) : approvedApplications.length === 0 ? (
          <p className="text-center text-gray-500 p-8 border border-gray-200 bg-gray-50 rounded-xl">
            No approved applications found at this time.
          </p>
        ) : (
          // ⭐ RESPONSIVENESS: Overflow-x-auto allows horizontal scrolling on mobile
          <div className="overflow-x-auto shadow-2xl rounded-xl mt-4 border border-gray-100">
            {/* min-w-full ensures the table expands fully within its container for scrolling */}
            <table className="min-w-full divide-y divide-indigo-200"> 
              {/* ⭐ ENHANCEMENT: Table Header Styling */}
              <thead className="bg-indigo-600">
                <tr>
                  {[
                      "Name", "Application Number", "Email", "DOB", "Year", 
                      "Branch", "Rank", "Counseling Round", "Distance (km)"
                  ].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {approvedApplications.map((app, index) => (
                  <motion.tr 
                      key={app.applicationNumber} 
                      variants={rowVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.03 }} // Faster stagger
                      className="hover:bg-indigo-50 transition-colors"
                  >
                    {/* ⭐ RESPONSIVENESS: Added 'text-sm' for mobile density */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700 font-mono">{app.applicationNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.dob}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{app.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.counselingRound}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{app.distance}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ApprovedStudents;