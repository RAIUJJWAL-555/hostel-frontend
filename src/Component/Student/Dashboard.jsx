import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from 'lucide-react'; // Icons for mobile toggle

import Sidebar from "../Student/Sidebar"; 
import Header from "../Student/Header"; 
import StatCard from "../Student/StatCard";
import MainCard from "../Student/MainCard";
import ProfileCard from "../Student/ProfileCard";
import NoticeList from "../Student/NoticeList";
import ComplaintBox from "../Student/ComplaintBox"; 
// Note: Fee submission/status change component (e.g., FeePaymentForm) will need to be imported here later

// Define the Base URL constant for API calls
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// Framer Motion Variants (Unchanged)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("dashboard"); 
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
    // ... (unchanged)
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
    // ... (unchanged session and data retrieval logic) ...
    const studentDataString = localStorage.getItem("studentData");

    if (!studentDataString) {
      toast.error("Please log in to access the dashboard.");
      navigate("/login/student"); 
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
    navigate("/login/student");
  };


  // ⭐ DYNAMIC LAYOUT CALCULATION
  const getMarginStyle = () => {
    // Only apply dynamic margin on large screens and up (desktop view)
    if (window.innerWidth >= 1024) {
      // 16rem = 256px (w-64); 4.5rem = 72px (w-18)
      const desktopMargin = isCollapsed ? '72px' : '256px';
      return { marginLeft: desktopMargin };
    }
    // On mobile, the sidebar is fixed/absolute, so the margin is 0
    return {};
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
    status,
    feeStatus,
    feeAmountDue,
    feeDueDate,
    ...profileData
  } = student;

  // --- Render Logic ---
  return (
    <div className="min-h-screen bg-gray-50 flex"> 
      
      {/* 1. Sidebar Component */}
      <Sidebar
        studentName={name}
        currentView={activeView}
        isCollapsed={isCollapsed} 
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)} // ⭐ Toggles the collapse state
        onNavigate={(view) => {
            setActiveView(view);
            setIsSidebarOpen(false); // Close on mobile navigation
        }}
        onLogout={handleLogout}
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* 2. Main Content Area */}
      <main 
        // ⭐ DYNAMIC MARGIN FOR DESKTOP COLLAPSE 
        style={getMarginStyle()}
        // PADDING: pl-12 is added for mobile to give space for the toggle button
        className="flex-grow p-4 pl-12 lg:p-8 transition-all duration-300"
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
          
          {/* View 1: Default Dashboard (Home) */}
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6" 
            >
              {/* Key Hostel Stats Section */}
              <motion.section
                // ⭐ RESPONSIVENESS: Cleanly adjusts the grid layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* StatCard components here */}
                <StatCard
                  title="Application Status"
                  value={status.toUpperCase()}
                  icon={
                    status === "approved"
                      ? "✅"
                      : status === "rejected"
                      ? "❌"
                      : "⏳"
                  }
                  color={
                    status === "approved"
                      ? "green"
                      : status === "rejected"
                      ? "red"
                      : "yellow"
                  }
                  variants={itemVariants}
                />
                <StatCard
                  title="Room Allotment"
                  value={roomAllotted || "Not Allotted"}
                  icon="🏠"
                  color={roomAllotted ? "blue" : "gray"}
                  variants={itemVariants}
                />
                <StatCard
                  title="Hostel Fees Status"
                  // Value remains clean for mobile view
                  value={feeStatus === "Paid" ? "PAID" : `₹ ${feeAmountDue || 0} DUE`} 
                  icon="💰"
                  color={feeStatus === "Paid" ? "green" : "red"} 
                  variants={itemVariants}
                />
              </motion.section>

              {/* Main Content Grid: Notices and Profile */}
              <motion.div
                // ⭐ RESPONSIVENESS: Profile stacks first on mobile/tablet (order-first)
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <MainCard
                  title="Student Profile"
                  variants={itemVariants}
                  // Takes full width on mobile/tablet, then 1 column on desktop
                  className="lg:col-span-1 order-first lg:order-none" 
                >
                  <ProfileCard studentData={student} />
                </MainCard>
                <MainCard
                  title="Hostel Notices & Updates"
                  variants={itemVariants}
                  // Takes full width on mobile/tablet, then 2 columns on desktop
                  className="lg:col-span-2" 
                >
                  <NoticeList />
                </MainCard>
              </motion.div>
            </motion.div>
          )}

          {/* View 2: Complaint Box */}
          {activeView === "complaint" && (
            <motion.div
              key="complaint-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <ComplaintBox 
                studentData={student} 
                onComplaintSubmitted={handleRefreshData} 
              />
            </motion.div>
          )}
          
          {/* Add conditional rendering for 'grades' and 'settings' here later */}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;