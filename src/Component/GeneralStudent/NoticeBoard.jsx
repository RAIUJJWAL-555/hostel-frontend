import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";



const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchActiveNotices();
  }, []);

  const fetchActiveNotices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notices?activeOnly=true`);
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    if (notices.length > 1) {
      const interval = setInterval(() => {
        setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
      }, 5000); // Rotate every 5 seconds
      return () => clearInterval(interval);
    }
  }, [notices]);

  if (notices.length === 0 || !isOpen) return null;

  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md overflow-hidden relative border-b border-indigo-500/30 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <div className="flex items-center flex-1 mr-4 overflow-hidden">
          <div className="flex-shrink-0 bg-indigo-500/20 p-1.5 rounded-full mr-3 animate-pulse">
            <Bell size={18} className="text-indigo-400" />
          </div>
          <span className="text-indigo-400 font-bold mr-2 text-xs md:text-sm uppercase tracking-wider hidden sm:block border-r border-slate-700 pr-2">Announcement</span>
          
          <div className="flex-1 relative h-6 overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentNoticeIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full"
                >
                    <p className="text-slate-300 font-medium truncate text-sm md:text-base">
                        <span className="font-semibold text-white mr-2">{notices[currentNoticeIndex]?.title}:</span>
                        {notices[currentNoticeIndex]?.content}
                    </p>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>

        <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-indigo-400 transition-colors p-1 rounded-full hover:bg-slate-800"
            aria-label="Close Announcement"
        >
            <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default NoticeBoard;
