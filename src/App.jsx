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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/staff" element={<Administration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register/admin" element={<AdminRegistrationForm/>} />
        <Route path="/register/student" element={<StudentRagister />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
       <Route path="/admin/dashboard/approved" element={
  <ProtectedRoute allowedRole="admin">
    <AdminDashboard />
  </ProtectedRoute>
} />
{/* <Route path="/admin/dashboard/fee" element={
  <ProtectedRoute allowedRole="admin">
    <FeeManagement/>
  </ProtectedRoute>
} /> */}

      
        <Route path='/admin/dashboard/room' element={
          <ProtectedRoute allowedRole="admin">
            <RoomInventory/>
          </ProtectedRoute>
        } />
        <Route path='/admin/dashboard/room/allot' element={
          <ProtectedRoute allowedRole="admin">
            <RoomAllotment/>
          </ProtectedRoute>
        } />
        <Route path='/student/dashboard' element={
          <ProtectedRoute allowedRole="student">
            <Dashboard/>
          </ProtectedRoute>
        } />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
