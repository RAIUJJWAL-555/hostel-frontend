import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; 

// Define the Base URL constant for API calls
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`; 

// FRAMER MOTION VARIANTS
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // ⭐ UPDATED: Default sort to 'high-low' (highest distance first, most relevant)
  const [sortType, setSortType] = useState("high-low");
  // ⭐ NEW FILTERS
  const [filterGender, setFilterGender] = useState("");
  const [filterBranch, setFilterBranch] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/hostel/applications`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch applications");
      }
      const updatedData = data.map((app) => ({
        ...app,
        status: app.status || "pending",
      }));
      
      // Apply initial sort (High-Low distance) immediately after fetching
      const initialSortedData = updatedData.sort((a, b) => b.distance - a.distance);
      
      setApplications(initialSortedData);

    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching applications: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationNumber) => {
    // ... (unchanged approval logic) ...
    try {
      const res = await fetch(
        `${BASE_URL}/hostel/applications/${applicationNumber}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "approved" }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to approve application");
      }
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.applicationNumber === applicationNumber
            ? { ...app, status: "approved" }
            : app
        )
      );
      toast.success(`Application ${applicationNumber} approved!`);
    } catch (err) {
      toast.error(`Error approving application: ${err.message}`);
    }
  };

  const handleReject = async (applicationNumber) => {
    // ... (unchanged rejection logic) ...
    try {
      const res = await fetch(
        `${BASE_URL}/hostel/applications/${applicationNumber}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "rejected" }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to reject application");
      }
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.applicationNumber === applicationNumber
            ? { ...app, status: "rejected" }
            : app
        )
      );
      toast.error(`Application ${applicationNumber} rejected!`);
    } catch (err) {
      toast.error(`Error rejecting application: ${err.message}`);
    }
  };

  const sortApplications = (e) => {
    const newSortType = e.target.value;
    setSortType(newSortType);
    let sortedApps = [...applications];
    switch (newSortType) {
      case "low-high":
        // Filter only pending apps for sorting efficiency if needed, but sorting all is safer
        sortedApps.sort((a, b) => a.distance - b.distance);
        break;
      case "high-low":
        sortedApps.sort((a, b) => b.distance - a.distance);
        break;
      default:
        // By default, show highest distance first (most relevant criteria for hostel)
        sortedApps.sort((a, b) => b.distance - a.distance);
        break;
    }
    setApplications(sortedApps);
  };
  
  useEffect(() => {
    fetchApplications();
  }, []);

  const pendingApplications = applications.filter(app => {
    return (
      app.status === 'pending' &&
      (filterGender === "" || app.gender === filterGender) &&
      (filterBranch === "" || app.branch.toLowerCase().includes(filterBranch.toLowerCase()))
    );
  });

  return (
    <motion.div>

      {/* Header and Sort Control */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6" 
        variants={itemVariants}
      >
        {/* ⭐ ENHANCEMENT: Title */}
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-4 sm:mb-0">
          Pending Applications ({pendingApplications.length})
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Filter by Branch"
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="border-2 border-indigo-300 text-sm px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 transition shadow-sm bg-white"
          />
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="border-2 border-indigo-300 text-sm px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 transition shadow-sm bg-white"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            onChange={sortApplications}
            className="border-2 border-indigo-300 text-sm px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 transition shadow-sm bg-white" 
            value={sortType}
          >
            <option value="high-low">Sort by: Distance (High to Low)</option>
            <option value="low-high">Sort by: Distance (Low to High)</option>
          </select>
        </div>
      </motion.div>
      
      {loading ? (
        <p className="text-center text-indigo-500 p-8 font-medium">Loading applications...</p>
      ) : error ? (
        <p className="text-red-600 p-4 border border-red-200 bg-red-50 rounded-xl">Error: {error}</p>
      ) : pendingApplications.length === 0 ? (
        <p className="text-gray-500 p-8 border border-gray-200 bg-gray-50 rounded-xl text-center">🎉 All pending applications have been processed. Great work!</p>
      ) : (
        <>
            {/* DUPLICATE VIEW: Mobile Cards (Visible only on mobile) */}
            <div className="grid grid-cols-1 gap-6 md:hidden">
                {pendingApplications.map((app, index) => {
                    const isHighPriority = index < 3 && sortType === 'high-low';
                    return (
                        <motion.div 
                            key={`mobile-${app.applicationNumber}`}
                            className={`bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col space-y-4 ${isHighPriority ? 'border-l-4 border-l-yellow-400' : ''}`}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                                    <p className="text-xs text-gray-500">{app.email}</p>
                                </div>
                                <span className="text-sm font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-1 rounded">
                                    {app.applicationNumber}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                                <div>
                                    <span className="block text-xs text-gray-500">Rank</span>
                                    <span className="font-semibold text-red-600">{app.rank}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500">Distance</span>
                                    <span className="font-extrabold text-green-700">{app.distance} km</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-xs text-gray-500">Branch / Year</span>
                                    <span className="font-medium text-gray-800">{app.branch} ({app.year})</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500">Gender</span>
                                    <span className="font-medium text-indigo-600">{app.gender}</span>
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-2">
                                <motion.button
                                    onClick={() => handleApprove(app.applicationNumber)}
                                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold shadow-sm text-sm"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Approve
                                </motion.button>
                                <motion.button
                                    onClick={() => handleReject(app.applicationNumber)}
                                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold shadow-sm text-sm"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Reject
                                </motion.button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ORIGINAL TABLE: Visible only on md screens and up */}
            <div className="hidden md:block overflow-x-auto shadow-2xl rounded-xl border border-gray-100"> 
            <table className="min-w-full divide-y divide-gray-200">
                
                {/* ⭐ ENHANCEMENT: Table Header Styling (Indigo Theme) */}
                <thead className="bg-indigo-600">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">App No</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Distance (km)</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Branch / Year</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">Action</th>
                </tr>
                </thead>
                
                <motion.tbody 
                className="bg-white divide-y divide-gray-100"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                >
                {pendingApplications.map((app, index) => {
                    
                    // Highlight rows with the highest distance for review
                    const isHighPriority = index < 3 && sortType === 'high-low';
                    
                    return (
                    <motion.tr 
                        key={app.applicationNumber} 
                        variants={rowVariants} 
                        // ⭐ ENHANCEMENT: Hover and Priority Row Styling
                        className={`hover:bg-indigo-50 transition-colors ${isHighPriority ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''}`}
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700 font-mono">{app.applicationNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{app.rank}</td>
                        
                        {/* Highlight Distance for Relevance */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-green-700">
                            {app.distance} km
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {app.branch} ({app.year})
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {app.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.email}</td>

                        {/* Action Column */}
                        <td className="px-6 py-4 whitespace-nowrap space-x-2 text-center text-xs md:text-sm">
                        <motion.button
                            onClick={() => handleApprove(app.applicationNumber)}
                            // ⭐ ENHANCEMENT: Button Styling
                            className="bg-green-600 text-white px-3 py-1.5 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            Approve
                        </motion.button>
                        <motion.button
                            onClick={() => handleReject(app.applicationNumber)}
                            className="bg-red-600 text-white px-3 py-1.5 rounded-lg font-semibold shadow-md hover:bg-red-700 transition mt-2 md:mt-0"
                            whileHover={{ scale: 1.05 }}
                        >
                            Reject
                        </motion.button>
                        </td>
                    </motion.tr>
                    );
                })}
                </motion.tbody>
            </table>
            </div>
        </>
      )}
    </motion.div>
  );
};

export default PendingApplications;