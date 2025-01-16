import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// Components
import NavigationBar from "./components/NavigationBar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import OnboardingPage from "./components/OnboardingPage";
import PersonalInfoPage from "./components/PersonalInfoPage";
import VisaStatusPage from "./components/VisaStatusPage";
import HousingPage from "./components/HousingPage";
import DashboardPage from "./components/DashboardPage"; // You'll need to create this
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import FacilityIssuesPage from "./components/FacilityIssuePage";

// Create theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

// Root redirect component
const RootRedirect: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.onboardingId) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <NavigationBar />
          <Routes>
            {/* Root path redirect */}
            <Route path="/" element={<RootRedirect />} />

            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />

            {/* Protected routes that require onboarding */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/personal-info"
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <PersonalInfoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visa-status"
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <VisaStatusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/housing"
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <HousingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/facilityissue"
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <FacilityIssuesPage />   
                </ProtectedRoute>
              }
            />

            {/* Protected routes that don't require onboarding */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute requireOnboarding={false}>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;

