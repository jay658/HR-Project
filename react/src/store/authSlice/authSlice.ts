import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const API_BASE_URL = "http://localhost:3000/api/employee";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      state.loading = false;
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
        } catch {
          state.isLoggedIn = false;
          state.user = null;
          state.token = null;
        }
      } else {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      }
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
