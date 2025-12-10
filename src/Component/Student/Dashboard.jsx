import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from 'lucide-react'; // Icons for mobile toggle
import Sidebar from "../Student/Sidebar"; 
import Header from "../Student/Header"; 

// Define the Base URL constant for API calls
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  // activeView removed, routing handles this
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer state
  const [refreshKey, setRefreshKey] = useState(0); 
  // ⭐ NEW STATE: Controls desktop sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const navigate = useNavigate();

  const handleRefreshData = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
    toast.info("Refreshing dashboard data...");
  }, []);

  // --- Data Fetching Logic (Unchanged) ---
  const fetchStudentProfile = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/student/profile/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch student profile.");
      }

      setStudent(data);
      toast.success("Profile data loaded/refreshed successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(`Error loading profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []); 

  
  useEffect(() => {
    const studentDataString = localStorage.getItem("studentData");

    if (!studentDataString) {
      toast.error("Please log in to access the dashboard.");
      navigate("/login"); 
      return;
    }

    let studentId;
    try {
      const storedStudentData = JSON.parse(studentDataString);
      studentId = storedStudentData._id;

      if (!studentId) {
        throw new Error(
          "Student ID (_id) not found in session. Please clear storage and log in again."
        );
      }
    } catch (e) {
      console.error("Local Storage Error:", e);
      setError("Session data is corrupt. Please log in again.");
      setLoading(false);
      return;
    }
    
    fetchStudentProfile(studentId);
    
  }, [navigate, fetchStudentProfile, refreshKey]); 


  const handleLogout = () => {
    localStorage.removeItem("studentData");
    toast.info("You have been logged out.");
    navigate("/login");
  };


  // --- Loading and Error Screens ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-2xl text-indigo-600 font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 p-8">
        <h1 className="text-3xl text-red-700 mb-4 font-bold">
          Error: {error || "Profile data unavailable"}
        </h1>
        <p className="text-red-600 mb-6 text-center">
          Could not load student data. Please ensure the backend is running and your session is valid.
        </p>
        <button
          onClick={handleLogout}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition shadow-md"
        >
          Return to Login
        </button>
      </div>
    );
  }

  const {
    name,
    roomAllotted,
  } = student;

  // --- Render Logic ---
  return (
    <div className="min-h-screen bg-gray-50 flex"> 
      
      {/* 1. Sidebar Component */}
      <Sidebar
        studentName={name}
        isCollapsed={isCollapsed} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} // ⭐ Toggles the collapse state
        onClose={() => setIsSidebarOpen(false)} // Just close sidebar on interaction
        onLogout={handleLogout}
        isMobileOpen={isSidebarOpen}
      />
      
      {/* 2. Main Content Area */}
      <main 
        // ⭐ DYNAMIC PADDING FOR DESKTOP COLLAPSE 
        // pl-12 is added for mobile to give space for the toggle button
        className={`flex-grow p-4 pl-12 lg:p-8 transition-all duration-300 ${isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[256px]'}`}
      >
          
        {/* MOBILE SIDEBAR TOGGLE BUTTON */}
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            // Fixed position for mobile, clear of the dynamic content margin
            className="lg:hidden fixed top-4 left-4 z-50 p-2 text-indigo-700 bg-white rounded-full shadow-lg"
            aria-label="Toggle Sidebar"
        >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Header
          studentName={name}
          roomNumber={roomAllotted || "N/A"}
          studentPhotoUrl="/path/to/alex.jpg"
        />

        <AnimatePresence mode="wait">
          <Outlet context={{ student, handleRefreshData }} />
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;