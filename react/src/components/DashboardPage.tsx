import type { AppDispatch, RootState } from "../store/store";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { fetchOnboarding } from "../store/onboardingSlice/onboardingThunks";

const DashboardPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const onboarding = useSelector((state: RootState) => state.onboarding)
  const { user } = useSelector((state: RootState) => state.auth)
  
  useEffect(()=>{
    dispatch(fetchOnboarding())
  },[]) 

  const getButtonDetails = () => {
    if (onboarding.status === null) {
      return { text: "Start Onboarding", path: "/onboarding" };
    } else if (onboarding.status === "pending") {
      return { text: "Review Onboarding", path: "/onboarding" };
    } else if (onboarding.status === "rejected") {
      return { text: "Fix Onboarding", path: "/onboarding" };
    }
    return null;
  };

  const getStatusText = (status: 'approved' | 'rejected' | 'pending' | null) => {
    if (!status) return 'Not Started';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const buttonDetails = getButtonDetails();

  const getStatusColor = (status: 'approved' | 'rejected' | 'pending' | null) => {
    if(!status) return '#757575'
    if(status === 'pending') return '#007bff'
    if(status === 'rejected') return '#d32f2f'
    return '#388e3c'
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        minHeight: "100vh",
        backgroundColor: "background.default",
        padding: 3,
      }}
    >
      <Card
        sx={{
          width: "75%",
          boxShadow: 3,
          padding: 2,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
            Welcome to your dashboard, <strong>{user?.username}</strong>!
          </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 2, textAlign: "center", color: "text.secondary" }}
          >
              Your onboarding status is: <strong style={{color: getStatusColor(onboarding.status)}}>{getStatusText(onboarding.status)}</strong>
            </Typography>

          {buttonDetails && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={buttonDetails.path}
              >
                {buttonDetails.text}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
