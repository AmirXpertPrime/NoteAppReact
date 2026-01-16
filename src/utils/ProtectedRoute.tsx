import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state: any) => state.user.user);
  const token = localStorage.getItem("jwtAuthToken");
  let location = useLocation();

  console.log("ProtectedRoute Check:", {
    isAuthenticated: user?.isAuthenticated,
    hasToken: !!token,
    userState: user,
  });

  // Check both Redux state and localStorage token
  if (!user?.isAuthenticated && !token) {
    console.log("ProtectedRoute: Redirecting to login");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  console.log("ProtectedRoute: Access granted");
  return children;
};

export default ProtectedRoute;
