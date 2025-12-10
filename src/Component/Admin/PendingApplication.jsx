import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; 
import { Edit2, Trash2, X } from "lucide-react"; 

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
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete student ${name}? This action cannot be undone.`)) return;

    try {
        const res = await fetch(`${BASE_URL}/hostel/students/${id}`, {
            method: 'DELETE',
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Failed to delete student');
        }

        setApplications(prev => prev.filter(app => app._id !== id));
        toast.success(`Student ${name} deleted successfully!`);

    } catch (err) {
        toast.error(`Error deleting student: ${err.message}`);
    }
  };

  const openEditModal = (student) => {
      setCurrentStudent(student);
      setEditFormData({ ...student });
      setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch(`${BASE_URL}/hostel/students/${currentStudent._id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(editFormData)
          });

          const data = await res.json();
          if(!res.ok) throw new Error(data.message || 'Update failed');

          setApplications(prev => prev.map(app => app._id === currentStudent._id ? data.student : app));
          toast.success("Student details updated successfully!");
          setIsEditModalOpen(false);
      } catch (err) {
          toast.error(`Update Error: ${err.message}`);
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
        
      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
            <motion.div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div 
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                >
                    <div className="flex justify-between items-center p-6 bg-indigo-600 text-white">
                        <h3 className="text-xl font-bold">Edit Student Details</h3>
                        <button onClick={() => setIsEditModalOpen(false)} className="hover:bg-indigo-700 p-1 rounded-full transition">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" name="name" value={editFormData.name || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Number</label>
                                <input type="text" name="applicationNumber" value={editFormData.applicationNumber || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed" readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" name="email" value={editFormData.email || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select name="gender" value={editFormData.gender || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                                <input type="text" name="branch" value={editFormData.branch || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                <input type="text" name="year" value={editFormData.year || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                                <input type="number" name="rank" value={editFormData.rank || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                                <input type="number" name="distance" value={editFormData.distance || ''} onChange={handleEditChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end space-x-3 border-t mt-4">
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md">Save Changes</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

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
                             {/* Mobile Edit/Delete Actions */}
                            <div className="flex justify-end space-x-4 pt-2 border-t border-gray-100">
                                <button onClick={() => openEditModal(app)} className="text-indigo-600 flex items-center text-sm font-medium hover:text-indigo-800">
                                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                                </button>
                                <button onClick={() => handleDelete(app._id, app.name)} className="text-red-500 flex items-center text-sm font-medium hover:text-red-700">
                                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                                </button>
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
                        
                        <div className="flex justify-center space-x-3 mt-2">
                             <button onClick={() => openEditModal(app)} className="text-gray-400 hover:text-indigo-600 transition" title="Edit Student">
                                <Edit2 className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleDelete(app._id, app.name)} className="text-gray-400 hover:text-red-500 transition" title="Delete Student">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
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