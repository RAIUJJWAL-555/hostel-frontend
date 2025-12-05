// src/Component/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const admin = localStorage.getItem('adminData');
  const student = localStorage.getItem('studentData');

  // 1. If allowedRole is 'admin', strictly check for admin data
  if (allowedRole === 'admin') {
    if (!admin) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  // 2. If allowedRole is 'student', strictly check for student data
  if (allowedRole === 'student') {
    if (!student) {
      return <Navigate to="/login" replace />; // Or /login/student if you prefer specific login pages
    }
    return children;
  }

  // 3. Fallback (Legacy behavior or if no role specified): 
  // If neither is logged in, redirect. 
  // Ideally, you should always specify allowedRole.
  if (!admin && !student) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
