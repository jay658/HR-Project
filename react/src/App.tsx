import { AppDispatch, RootState } from "./store/store"; // Adjust path accordingly
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import DashboardPage from './components/DashboardPage';
import FacilityIssuesPage from './components/FacilityIssuePage';
import HousingPage from './components/HousingPage';
import LoginPage from './components/LoginPage';
// Components
import NavigationBar from './components/NavigationBar';
import OnboardingPage from './components/OnboardingPage';
import PersonalInfoPage from './components/PersonalInfoPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationPage from './components/RegistrationPage';
import VisaStatusPage from './components/VisaStatusPage';
// Redux Slice Imports
import { loadUserFromStorage } from './store/authSlice/authSlice'; // Adjust path accordingly
import { store } from './store/store';

// Create theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});

// Root redirect component
const RootRedirect: React.FC = () => {
  const { isLoggedIn, loading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  // Load user from localStorage when the app loads
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // Show loading spinner while checking user state
  if (loading) {
    return <div>Loading...</div>; // Replace with a styled spinner if needed
  }
  // Redirect logic based on user state
  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }
  // Redirect to onboarding if not yet completed
  if (!user?.onboardingId) {
    return <Navigate to='/onboarding' replace />;
  }

  // Otherwise, redirect to dashboard
  return <Navigate to='/dashboard' replace />;
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
            <Route path='/' element={<RootRedirect />} />

            {/* Public routes */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />

            {/* Protected routes that require onboarding */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path='/personal-info'
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <PersonalInfoPage />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path='/visa-status'
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <VisaStatusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/housing'
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <HousingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/facilityissue'
              element={
                <ProtectedRoute requireOnboarding={true}>
                  <FacilityIssuesPage />
                </ProtectedRoute>
              }
            />

            {/* Protected routes that don't require onboarding */}
            <Route
              path='/onboarding'
              element={
                <ProtectedRoute requireOnboarding={false}>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
