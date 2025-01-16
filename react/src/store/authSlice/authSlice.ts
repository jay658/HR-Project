import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  email: string;
  onboardingId: string | null;
  personalInfoId: string | null;
  visaApplicationId: string | null;
  apartmentId: string | null;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: true, // Initial loading state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isLoggedIn", "true"); // Storing isLoggedIn flag
      state.loading = false; // End loading after login
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn"); // Remove isLoggedIn from localStorage
      state.loading = false; // End loading after logout
    },
    loadUserFromStorage(state) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

      if (storedUser && storedToken && storedIsLoggedIn === "true") {
        try {
          state.isLoggedIn = true;
          state.user = JSON.parse(storedUser);
          state.token = storedToken;
        } catch (error) {
          console.error(
            "Error parsing user or token from localStorage:",
            error
          );
          state.isLoggedIn = false;
          state.user = null;
          state.token = null;
        }
      } else {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      }
      state.loading = false; // End loading when data is loaded
    },
  },
});

export const { login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
