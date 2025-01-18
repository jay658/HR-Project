import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";
// NavigationBar.tsx
import React from "react";
import { RootState } from "../store/store"; // Adjust path
import { useSelector } from "react-redux";

const NavigationBar: React.FC = () => {
  let { isLoggedIn } = useSelector((state: RootState) => state.auth);
  isLoggedIn =
    isLoggedIn || (localStorage.getItem("isLoggedIn") ? true : false);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Beaconfire Employee
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {!isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/registration">
                Registration
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
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
          <Button color="inherit" component={Link} to="/facilityissue">
            Facility Issue
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
