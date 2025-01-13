import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Adjust path as needed

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  //   const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
