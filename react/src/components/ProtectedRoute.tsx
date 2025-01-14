import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireOnboarding = true,
}) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    // Save the attempted URL for redirect after login
    sessionStorage.setItem("redirectUrl", location.pathname);
    return <Navigate to="/login" replace />;
  }

  // If onboarding is required and user hasn't completed it
  if (requireOnboarding && !user?.onboardingId) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
