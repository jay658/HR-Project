import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store"; // Path to your store file
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
import DashboardPage from "./components/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FacilityIssuesPage from "./components/FacilityIssuePage";

// Redux Slice Imports
import { loadUserFromStorage } from "./store/authSlice/authSlice"; // Adjust path accordingly
import { RootState } from "./store/store"; // Adjust path accordingly

// Create theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

// Root redirect component
const RootRedirect: React.FC = () => {
  const { isLoggedIn, user, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  // Load user from localStorage when the app loads
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Don't redirect until the loading is complete
  if (loading) {
    return null; // Or a loading spinner if desired
  }

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
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
