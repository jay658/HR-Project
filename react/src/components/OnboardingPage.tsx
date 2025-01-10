import React from "react";
import { Box, Typography, Button } from "@mui/material";

const OnboardingPage: React.FC = () => {
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
    </Box>
  );
};

export default OnboardingPage;
