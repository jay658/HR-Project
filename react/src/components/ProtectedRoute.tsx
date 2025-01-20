import { AppDispatch, RootState } from "../store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { Navigate } from "react-router-dom";
import { loadUserFromStorage } from '../store/authSlice/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  const { isLoggedIn, sessionLoading } = useSelector((state: RootState) => state.auth)
  
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (sessionLoading) {
      dispatch(loadUserFromStorage());
    }
  }, [dispatch, sessionLoading]);

  if(sessionLoading){
    return <div>loading...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
