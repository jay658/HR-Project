import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Beaconfire Employee
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" component={Link} to="/registration">
            Registration
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/onboarding">
            Onboarding
          </Button>
          <Button color="inherit" component={Link} to="/personal-info">
            Personal Info
          </Button>
          <Button color="inherit" component={Link} to="/visa-status">
            Visa Status
          </Button>
          <Button color="inherit" component={Link} to="/housing">
            Housing
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
