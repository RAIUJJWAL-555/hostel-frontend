// src/Component/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const admin = localStorage.getItem('adminData');
  const student = localStorage.getItem('studentData');

  // Agar dono absent hai, to login pe redirect
  if (!admin && !student) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
