import { AppDispatch, RootState } from '../store/store';
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { fetchOnboarding, updateOnboarding } from '../store/onboardingSlice/onboardingThunks';
import { useDispatch, useSelector } from 'react-redux'

import type { Onboarding } from '../store/onboardingSlice/onboardingSlice';

const OnboardingPage: React.FC = () => {
  const onboarding = useSelector((state: RootState) => state.onboarding);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOnboarding())
  }, [])

  const handleUpdateOnboarding = () => {
    const testUpdates: Partial<Onboarding> = {
      residency: 'citizen',
      address: '12345 fake street'
    }

    dispatch(updateOnboarding(testUpdates))
  }

  console.log(onboarding)
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Onboarding Application
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the onboarding process! Please complete the required steps
        and submit your application.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Start Application
      </Button>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleUpdateOnboarding()}>
        Update Application
      </Button>
    </Box>
  );
};

export default OnboardingPage;
