// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Administration from './Pages/Administration';
import Contact from './Pages/Contact';
import LoginForm from './Pages/Login';
import StudentRagister from './Component/Student/StudentRagister';
import { toast, ToastContainer } from 'react-toastify';
import AdminDashboard from './Component/Admin/AdminDashboard';
import ProtectedRoute from './Component/ProtectedRoute';
import AdminRegistrationForm from './Component/Admin/AdminRegistrationForm';
import RoomInventory from './Component/Admin/RoomInventory';
import RoomAllotment from './Component/Admin/RoomAllotment';
import Dashboard from './Component/Student/Dashboard';
import FeeManagement from './Component/Admin/FeeManagement';
import PendingApplications from './Component/Admin/PendingApplication';
import ApprovedStudents from './Component/Admin/ApprovedStudents';
import ComplaintList from './Component/Admin/ComplainList';
import NoticeManagement from './Component/Admin/NoticeManagement';
import StudentMainView from './Component/Student/StudentMainView';
import ComplaintBoxWrapper from './Component/Student/ComplaintBoxWrapper';
import { ThemeProvider } from './context/ThemeContext';
import FloatingThemeToggle from './Component/FloatingThemeToggle';

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/staff" element={<Administration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register/admin" element={<AdminRegistrationForm/>} />
        <Route path="/register/student" element={<StudentRagister />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }>
          <Route index element={<PendingApplications />} />
          <Route path="applications" element={<PendingApplications />} />
          <Route path="approved" element={<ApprovedStudents />} />
          <Route path="complaints" element={<ComplaintList />} />
          <Route path="fees" element={<FeeManagement />} />
          <Route path="inventory" element={<RoomInventory />} />
          <Route path="allotment" element={<RoomAllotment />} />
          <Route path="notices" element={<NoticeManagement />} />
          <Route path="register" element={<AdminRegistrationForm />} />
        </Route>
      
        <Route path='/student/dashboard' element={
          <ProtectedRoute allowedRole="student">
            <Dashboard/>
          </ProtectedRoute>
        }>
           <Route index element={<StudentMainView />} />
           <Route path="complaint" element={<ComplaintBoxWrapper />} />
        </Route>
      </Routes>
      <FloatingThemeToggle />
      <ToastContainer position="top-center" autoClose={2000} />
    </ThemeProvider>
  );
};

export default App;
