import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import MainCard from './MainCard';
import ProfileCard from './ProfileCard';
import NoticeList from './NoticeList';
import StatCard from './StatCard';

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

const StudentMainView = () => {
  // Access student data from the parent outlet context
  const { student } = useOutletContext();

  if (!student) return null; // Or a loading spinner if desired, but parent handles main loading

  const {
      status,
      roomAllotted,
      feeStatus,
      feeAmountDue
  } = student;

  return (
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatCard
          title="Application Status"
          value={status ? status.toUpperCase() : "UNKNOWN"}
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
          value={feeStatus === "Paid" ? "PAID" : `₹ ${feeAmountDue || 0} DUE`} 
          icon="💰"
          color={feeStatus === "Paid" ? "green" : "red"} 
          variants={itemVariants}
        />
      </motion.section>

      {/* Main Content Grid: Notices and Profile */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MainCard
          title="Student Profile"
          variants={itemVariants}
          className="lg:col-span-1 order-first lg:order-none" 
        >
          <ProfileCard studentData={student} />
        </MainCard>
        <MainCard
          title="Hostel Notices & Updates"
          variants={itemVariants}
          className="lg:col-span-2" 
        >
          <NoticeList />
        </MainCard>
      </motion.div>
    </motion.div>
  );
};

export default StudentMainView;
