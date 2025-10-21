import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; 
import { Menu, X } from 'lucide-react'; // For the mobile toggle icon

import ApprovedStudents from "./ApprovedStudents";
import AdminSidebar from "./AdminSidebar"; // This component needs internal updates (see below)
import AdminHeader from "./AdminHeader";
import PendingApplications from "./PendingApplication";
import FeeManagement from "./FeeManagement"; 
import ComplaintList from "./ComplainList";

import RoomInventory from "./RoomInventory"; 
import RoomAllotment from "./RoomAllotment"; 
// ------------------------------------
// FRAMER MOTION VARIANTS (Unchanged)
// ------------------------------------
const contentContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            when: "beforeChildren", 
            staggerChildren: 0.1, 
        },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("applications"); 
  const [adminName, setAdminName] = useState("Admin"); 
  // ⭐ NEW STATE: Manages sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    toast.success("Logged out successfully!");
    navigate("/login");
  };
  
  useEffect(() => {
    const adminDataString = localStorage.getItem('adminData');
    if (adminDataString) {
      try {
        const adminData = JSON.parse(adminDataString);
        if (adminData.name) {
          setAdminName(adminData.name);
        }
      } catch (e) {
        console.error("Could not parse adminData from localStorage", e);
      }
    }
  }, []);

  const renderView = () => {
    switch (activeView) {
        case 'applications':
            return <PendingApplications />; 
        case 'complaints':
            return <ComplaintList />;
        case 'approved':
            return <ApprovedStudents />;
        case 'fees':
            return <FeeManagement />;
        case 'inventory': 
            return <RoomInventory />; 
        case 'allotment':
            return <RoomAllotment />;
        default:
            return <PendingApplications />;
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
        
      {/* 1. Sidebar Component (Pass state control props) */}
      <AdminSidebar 
        onLogout={handleLogout} 
        currentView={activeView}
        onNavigate={(view) => {
            setActiveView(view);
            // Close sidebar automatically after navigation on mobile
            setIsSidebarOpen(false); 
        }}
        // ⭐ PROP FOR RESPONSIVENESS
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      /> 
      
      {/* 2. Mobile Sidebar Toggle Button */}
      <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          // ⭐ Only show on screens smaller than large (lg)
          className="lg:hidden fixed top-4 left-4 z-50 p-2 text-indigo-700 bg-white rounded-full shadow-lg"
          aria-label="Toggle Sidebar"
      >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 3. Main Content Area */}
      <div 
        // ⭐ RESPONSIVE PADDING: Full width on mobile, shifted right on desktop
        // pl-12 is added for mobile to give space for the toggle button
        className="flex-grow p-4 pl-12 lg:p-8 lg:pl-[280px] transition-all duration-300 bg-gray-50"
      >
        <AdminHeader userName={adminName}/>

        {/* Dashboard Title */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            // Adjusted margins: mt-12 for mobile to clear the fixed toggle button
            className="flex justify-between items-center mb-8 mt-12 lg:mt-4" 
        >
            <h1 className="text-3xl lg:text-4xl font-extrabold text-indigo-700 tracking-tight"> 
              Application Management Portal
            </h1>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="mt-4 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 min-h-[70vh]" 
          variants={contentContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait"> 
              <motion.div
                  key={activeView}
                  initial={{ opacity: 0, x: activeView === 'applications' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeView === 'applications' ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
              >
                  {renderView()}
              </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;