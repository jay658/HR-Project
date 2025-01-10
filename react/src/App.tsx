import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import NavigationBar from "./components/NavigationBar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import OnboardingPage from "./components/OnboardingPage";
import PersonalInfoPage from "./components/PersonalInfoPage";
import VisaStatusPage from "./components/VisaStatusPage";
import HousingPage from "./components/HousingPage";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // customize your primary color
    },
    secondary: {
      main: "#dc004e", // customize your secondary color
    },
  },
});
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/personal-info" element={<PersonalInfoPage />} />
          <Route path="/visa-status" element={<VisaStatusPage />} />
          <Route path="/housing" element={<HousingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
