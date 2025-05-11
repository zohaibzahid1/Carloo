import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  
  if (!isAuthenticated) {
    toast.error("You need to be logged in to access this page");
    return <Navigate to="/login"  />; 
  }
  return children;
};

export default ProtectedRoute;
