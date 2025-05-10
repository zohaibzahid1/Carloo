import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    toast.error("You need to be logged in to access this page");
    return <Navigate to="/login"  />; // replace the current entry in the history stack with the new one
    // we do this so when the user clicks back, they don't go back to the protected route
    // but to the previous page before the protected route
    // its a stack based implementation of the history

  }

  return children;
};

export default ProtectedRoute;
