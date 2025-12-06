import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Send, AlertCircle, CheckCircle } from "lucide-react";

// Assuming you have an API config file, or use the base URL directly
// import { API_BASE_URL } from "../../apiConfig"; 
// Using a hardcoded base URL for now based on your previous files context (usually localhost:5000 or from environment)
const API_BASE_URL = "http://localhost:5000"; 

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch notices on mount
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notices`);
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      } else {
        toast.error("Failed to fetch notices.");
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast.error("Error fetching notices.");
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/notices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        toast.success("Notice announced successfully!");
        setTitle("");
        setContent("");
        fetchNotices(); // Refresh list
      } else {
        toast.error("Failed to create notice.");
      }
    } catch (error) {
      console.error("Error creating notice:", error);
      toast.error("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this notice?")) return;
    console.log("Deleting notice with ID:", id);

    try {
      const response = await fetch(`${API_BASE_URL}/api/notices/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Notice deleted.");
        fetchNotices();
      } else {
        toast.error("Failed to delete notice.");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Server error.");
    }
  };

  const toggleNoticeStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notices/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        toast.success(`Notice ${!currentStatus ? "activated" : "deactivated"}.`);
        fetchNotices();
      } else {
         toast.error("Failed to update status.");
      }
    } catch (error) {
        console.error("Error updating notice:", error);
        toast.error("Server error.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Notice Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
      >
        <div className="flex items-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full mr-4 text-indigo-600">
            <Send size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Announce New Notice</h2>
        </div>

        <form onSubmit={handleCreateNotice} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
              placeholder="e.g. Hostel Maintenance Notice"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none h-32"
              placeholder="Enter the details of the announcement..."
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <Send size={18} className="mr-2" />
              {loading ? "Publishing..." : "Publish Notice"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Notices List Section */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
            <AlertCircle className="mr-2 text-indigo-500"/>
            Previous Announcements
        </h3>
        
        {notices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No notices announced yet.</p>
        ) : (
            <div className="space-y-4">
            <AnimatePresence>
                {notices.map((notice) => (
                <motion.div
                    key={notice._id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 md:p-5 rounded-lg border-l-4 shadow-sm transition-all duration-300 ${notice.isActive ? 'bg-indigo-50 border-indigo-500' : 'bg-gray-50 border-gray-300 opacity-70'}`}
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1 w-full">
                            <h4 className={`text-base md:text-lg font-bold mb-1 flex items-center flex-wrap gap-2 ${notice.isActive ? 'text-indigo-900' : 'text-gray-600'}`}>
                                {notice.title}
                                {!notice.isActive && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full uppercase tracking-wide">Inactive</span>}
                            </h4>
                            <p className="text-sm md:text-base text-gray-700 whitespace-pre-wrap">{notice.content}</p>
                            <span className="text-xs text-gray-500 mt-2 block">
                                Posted on: {new Date(notice.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center self-end md:self-center space-x-2">
                            <button
                                onClick={() => toggleNoticeStatus(notice._id, notice.isActive)}
                                className={`p-2 rounded-full transition-colors ${notice.isActive ? 'text-green-600 hover:bg-green-100 bg-white shadow-sm' : 'text-gray-400 hover:bg-gray-200 bg-gray-100'}`}
                                title={notice.isActive ? "Mark as Inactive" : "Mark as Active"}
                            >
                                <CheckCircle size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteNotice(notice._id)}
                                className="p-2 text-red-500 rounded-full hover:bg-red-50 bg-white shadow-sm transition-colors"
                                title="Delete Notice"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
            </div>
        )}
      </div>
    </div>
  );
};

export default NoticeManagement;
