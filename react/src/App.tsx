import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import NavigationBar from "./components/NavigationBar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import OnboardingPage from "./components/OnboardingPage";
import PersonalInfoPage from "./components/PersonalInfoPage";
import VisaStatusPage from "./components/VisaStatusPage";
import HousingPage from "./components/HousingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavigationBar />
        <Routes>
          {/* Root path redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/registration"
            element={
              <ProtectedRoute>
                <RegistrationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal-info"
            element={
              <ProtectedRoute>
                <PersonalInfoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visa-status"
            element={
              <ProtectedRoute>
                <VisaStatusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/housing"
            element={
              <ProtectedRoute>
                <HousingPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
