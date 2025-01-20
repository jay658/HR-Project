import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const PersonalInfoPage: React.FC = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        Update your personal details below.
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        variant="outlined"
        defaultValue="John"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        variant="outlined"
        defaultValue="Doe"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        variant="outlined"
        defaultValue="john.doe@example.com"
        disabled
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default PersonalInfoPage;