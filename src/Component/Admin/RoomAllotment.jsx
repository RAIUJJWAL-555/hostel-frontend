import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { DoorOpen, Users, CheckCircle } from 'lucide-react'; // Icons for visual clarity

// Define the Base URL constant for API calls
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// --- FRAMER MOTION VARIANTS ---
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } }
};
// -----------------------------

const RoomAllotment = () => {
  const [applications, setApplications] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({}); 
  const [globalError, setGlobalError] = useState(null);

  // --- API Calls ---

  const fetchApplications = async () => {
    setLoading(true);
    setGlobalError(null);
    try {
      const res = await fetch(`${BASE_URL}/hostel/applications`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch applications.');
      
      const approvedData = data.filter(app => app.status === 'approved');
      const sortedData = approvedData.sort((a, b) => a.rank - b.rank); // Sort by Rank
      
      setApplications(sortedData);
      
    } catch (err) {
      setGlobalError(err.message);
      toast.error(`Fetch Applications Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${BASE_URL}/hostel/rooms`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch rooms.');
      
      // Filter rooms that are not 'Full' and are 'Available'
      const availableRooms = data.filter(room => room.status === 'Available');
      setRooms(availableRooms);
    } catch (err) {
      toast.error(`Fetch Rooms Error: Failed to load room list.`);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchRooms();
  }, []);

  const handleAllotRoom = async (applicationNumber) => {
    const roomNumber = selectedRoom[applicationNumber];
    
    if (!roomNumber) {
        toast.warn("Please select a room first.");
        return;
    }
    
    setLoading(true);
    toast.info(`Allotting Room ${roomNumber} to ${applicationNumber}...`);
    
    try {
      const res = await fetch(`${BASE_URL}/hostel/applications/${applicationNumber}/allot-room`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomNumber: roomNumber }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed to allot room.`);

      toast.success(`Room ${roomNumber} successfully allotted!`, { position: 'top-center' });
      
      // Refresh both lists after successful allotment
      // NOTE: Using a delay for visual effect after success toast
      setTimeout(() => {
        fetchApplications(); 
        fetchRooms();
      }, 500);

    } catch (err) {
      toast.error(`Allotment Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRoomSelect = (appNo, roomNo) => {
    setSelectedRoom(prev => ({ ...prev, [appNo]: roomNo }));
  };

  const pendingAllotment = applications.filter(app => !app.roomAllotted);
  const allottedStudents = applications.filter(app => app.roomAllotted);


  return (
    // ⭐ ENHANCEMENT: Removed bg-gray-50 padding from here, relies on parent dashboard
    <div className="pt-2"> 
      
      <motion.h1 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-3xl font-extrabold text-indigo-700 mb-8 text-left border-b pb-2"
      >
        Room Allotment Panel
      </motion.h1>
      
      {globalError && (
        <p className="p-4 mb-4 text-center text-red-600 border border-red-200 bg-red-50 rounded-xl">Error: Could not load data. {globalError}</p>
      )}

      <motion.div 
        className="max-w-full mx-auto space-y-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        
        {/* Available Rooms Status Card (Now uses a more vibrant indigo color) */}
        <motion.div 
          className="bg-indigo-50 p-4 rounded-xl shadow-md border border-indigo-200 flex items-center justify-between"
          variants={cardVariants}
        >
            <div className="flex items-center space-x-3">
                <DoorOpen className="w-6 h-6 text-indigo-700" />
                <h2 className="text-xl font-semibold text-indigo-800">Available Rooms Status</h2>
            </div>
            <p className="text-lg font-extrabold text-indigo-900">
                {rooms.length} <span className="font-normal text-sm text-indigo-700">Rooms Ready</span>
            </p>
        </motion.div>

        {/* --- 1. Pending Allotment List --- */}
        <motion.div 
          className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100"
          variants={cardVariants}
        >
          <h2 className="text-xl font-bold text-gray-800 p-4 md:p-6 bg-gray-50 border-b">
            Students Pending Room Allotment ({pendingAllotment.length})
          </h2>

          <AnimatePresence mode="wait">
          {loading && pendingAllotment.length === 0 && <motion.p key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="p-6 text-center text-indigo-500">Loading approved applications...</motion.p>}

          {!loading && pendingAllotment.length === 0 && (
            <motion.p key="no-pending" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="p-6 text-center text-gray-500">
                <CheckCircle className="w-5 h-5 inline-block mr-2 text-green-500" /> All approved students have been allotted a room.
            </motion.p>
          )}
          </AnimatePresence>

          {!loading && pendingAllotment.length > 0 && (
            // ⭐ RESPONSIVENESS: Overflow-x-auto for table scrolling
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Priority / Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">App No.</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Room Selection</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <motion.tbody 
                  className="bg-white divide-y divide-gray-100"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                    {pendingAllotment.map((app) => (
                    <motion.tr key={app._id} variants={itemVariants} className="hover:bg-indigo-50 transition-colors">
                        
                        {/* Priority / Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className='text-base font-semibold text-gray-900'>{app.name}</div>
                            <div className='text-xs font-bold text-red-600'>Rank: {app.rank}</div>
                        </td>
                        
                        {/* App No */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">{app.applicationNumber}</td>
                        
                        {/* Room Allotment Dropdown */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <select
                                value={selectedRoom[app.applicationNumber] || ''}
                                onChange={(e) => handleRoomSelect(app.applicationNumber, e.target.value)}
                                // ⭐ ENHANCED SELECT STYLING
                                className="p-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition w-full min-w-[180px]"
                                disabled={loading}
                            >
                                <option value="" disabled>-- Select Room ({rooms.length}) --</option>
                                {rooms.map(room => (
                                    <option key={room._id} value={room.roomNumber}>
                                        {room.roomNumber} ({room.type} - {room.occupancyCount}/{room.capacity})
                                    </option>
                                ))}
                                {rooms.length === 0 && <option value="" disabled>No Available Rooms</option>}
                            </select>
                        </td>

                        {/* Allot Button */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <motion.button
                                onClick={() => handleAllotRoom(app.applicationNumber)}
                                // ⭐ ENHANCED BUTTON STYLING
                                className="bg-green-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-green-700 transition duration-150 disabled:opacity-50 shadow-md"
                                disabled={loading || !selectedRoom[app.applicationNumber]}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Allot Room
                            </motion.button>
                        </td>
                    </motion.tr>
                    ))}
                </motion.tbody>
                </table>
            </div>
          )}
        </motion.div>
        
        {/* --- 2. Allotted Students List (Card Grid) --- */}
        <motion.div 
          className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100"
          variants={cardVariants}
        >
          <h2 className="text-xl font-bold text-gray-800 p-4 md:p-6 bg-gray-50 border-b flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Students Already Allotted Rooms ({allottedStudents.length})</span>
          </h2>
          
          <div className="p-6">
             {allottedStudents.length > 0 ? (
                <motion.div 
                    // ⭐ RESPONSIVENESS: Grid layout adjusts based on screen size
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {allottedStudents.map(app => (
                        <motion.div 
                            key={app._id} 
                            variants={itemVariants}
                            // ⭐ ENHANCED CARD STYLING
                            className="bg-white p-4 rounded-xl border border-green-200 shadow-lg flex flex-col space-y-1 transform transition-all"
                            whileHover={{ y: -3, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)", zIndex: 10 }}
                        >
                            <h3 className="text-lg font-extrabold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap">
                                {app.name}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center">
                                <span className="font-semibold text-green-600 text-xl mr-2">🚪</span>
                                Room: <span className="font-extrabold ml-1 text-2xl text-indigo-700">{app.roomAllotted}</span>
                            </p>
                            <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                                App No: <span className='font-mono'>{app.applicationNumber}</span> | Rank: {app.rank}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
             ) : (
                <p className='text-gray-500'>No students have been allotted a room yet.</p>
             )}
          </div>
        </motion.div>
        
      </motion.div>
    </div>
  );
};

export default RoomAllotment;