import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, Home } from 'lucide-react'; // Icons for visual clarity

// Define the Base URL constant for API calls
const BASE_URL = 'http://localhost:5000/api';

const RoomInventory = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    capacity: 2,
    type: 'Double',
    status: 'Available',
  });
  const [loading, setLoading] = useState(false);

  // Room Type options for dropdown
  const roomTypes = ['Single', 'Double', 'Triple', 'Quad'];
  // Renamed for clarity in the UI
  const roomStatuses = ['Available', 'Full', 'Maintenance']; 

  // --- API Calls ---

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/hostel/rooms`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch rooms.');
      setRooms(data);
    } catch (err) {
      toast.error(`Fetch Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = { ...newRoom, capacity: Number(newRoom.capacity) };

    try {
      const res = await fetch(`${BASE_URL}/hostel/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add room.');

      toast.success('Room added successfully!', { position: 'top-center' });
      setNewRoom({ roomNumber: '', capacity: 2, type: 'Double', status: 'Available' });
      fetchRooms();

    } catch (err) {
      toast.error(`Add Room Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!confirm("Are you sure you want to delete this room? This action is irreversible.")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/hostel/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Failed to delete room.');
      }

      toast.success('Room deleted successfully!', { position: 'top-center' });
      fetchRooms();

    } catch (err) {
      toast.error(`Delete Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get status classes for the table cells
  const getStatusClasses = (status) => {
    switch (status) {
        case 'Available': return 'bg-green-50 text-green-700 border-green-300';
        case 'Full': return 'bg-red-50 text-red-700 border-red-300';
        case 'Maintenance': return 'bg-yellow-50 text-yellow-700 border-yellow-300';
        default: return 'bg-gray-50 text-gray-700 border-gray-300';
    }
  };

  const handleStatusChange = async (roomId, newStatus) => {
    if (newStatus === rooms.find(r => r._id === roomId)?.status) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/hostel/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update status.');

      toast.info(`Room ${data.room.roomNumber} status updated to ${data.room.status}.`, { position: 'top-center' });
      fetchRooms();

    } catch (err) {
      toast.error(`Update Status Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="pt-2">
      {/* ⭐ ENHANCEMENT: Title */}
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 text-left border-b pb-2">
        Room Inventory Management
      </h1>
      
      <div className="max-w-6xl mx-auto space-y-10">

        {/* --- 1. Add New Room Form --- */}
        <motion.div 
            className="bg-white shadow-2xl rounded-xl p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center space-x-2">
            <PlusCircle className="w-5 h-5"/>
            <span>Add New Room</span>
          </h2>
          
          {/* ⭐ RESPONSIVENESS: Grid layout adjusts on small screens */}
          <form onSubmit={handleAddRoom} className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
            
            {/* Room Number */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                placeholder="E.g., A-101"
                value={newRoom.roomNumber}
                onChange={handleChange}
                // ⭐ ENHANCED INPUT STYLING
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            
            {/* Capacity */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Capacity (Beds)</label>
              <input
                type="number"
                name="capacity"
                min="1"
                placeholder="Capacity"
                value={newRoom.capacity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            
            {/* Type */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Room Type</label>
              <select
                name="type"
                value={newRoom.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              >
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Initial Status</label>
              <select
                name="status"
                value={newRoom.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              >
                {roomStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 md:col-span-1">
                <button
                type="submit"
                // ⭐ ENHANCED BUTTON STYLING
                className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50 shadow-md"
                disabled={loading || !newRoom.roomNumber || !newRoom.capacity}
                >
                {loading ? 'Adding...' : 'Add Room'}
                </button>
            </div>
          </form>
        </motion.div>

        {/* --- 2. Room List Table --- */}
        <motion.div 
            className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-800 p-4 md:p-6 bg-gray-50 border-b flex items-center space-x-2">
            <Home className="w-5 h-5 text-indigo-600"/>
            <span>Existing Rooms Inventory ({rooms.length})</span>
          </h2>

          {loading && <p className="p-6 text-center text-indigo-500">Loading rooms...</p>}

          {!loading && rooms.length === 0 && (
            <p className="p-6 text-center text-gray-500">No rooms found. Please add some rooms above.</p>
          )}

          {!loading && rooms.length > 0 && (
            // ⭐ RESPONSIVENESS: overflow-x-auto for table scrolling
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                
                {/* ⭐ ENHANCED TABLE HEADER */}
                <thead className="bg-indigo-600">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Room No.</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Occupied</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-sm">
                    {rooms.map((room) => (
                    <motion.tr 
                        key={room._id} 
                        className="hover:bg-indigo-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{room.roomNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{room.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{room.capacity} beds</td>
                        {/* Occupancy Count (Assuming 'occupiedCount' field exists or is calculated) */}
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-indigo-600">
                            {room.occupiedCount || 0} / {room.capacity}
                        </td>
                        
                        {/* Status Dropdown */}
                        <td className="px-6 py-4 whitespace-nowrap">
                            <select
                                value={room.status}
                                onChange={(e) => handleStatusChange(room._id, e.target.value)}
                                // ⭐ DYNAMICALLY STYLED SELECT BOX
                                className={`p-1 rounded-lg text-sm font-semibold border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${getStatusClasses(room.status)}`}
                                disabled={loading}
                            >
                                {roomStatuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                onClick={() => handleDeleteRoom(room._id)}
                                // ⭐ ENHANCED DELETE BUTTON STYLING
                                className="inline-flex items-center text-red-600 hover:text-red-800 transition duration-150 disabled:opacity-50"
                                disabled={loading || room.occupiedCount > 0} // Prevent deletion if occupied
                                title={room.occupiedCount > 0 ? "Cannot delete occupied room" : "Delete Room"}
                            >
                                <Trash2 className="w-4 h-4 mr-1"/>
                                Delete
                            </button>
                        </td>
                    </motion.tr>
                    ))}
                </tbody>
                </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoomInventory;