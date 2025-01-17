import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Types
interface Roommate {
  id: string;
  username: string;
  email: string;
  isCurrentUser: boolean;
}

interface Apartment {
  _id: string;
  unit: string;
  capacity: number;
  address: string;
  status: "available" | "unavailable";
}

interface HousingDetails {
  apartment: Apartment;
  currentUser: {
    id: string;
    username: string;
    email: string;
  };
  roommates: Roommate[];
}

interface HousingState {
  housingDetails: HousingDetails | null;
  loading: boolean;
  error: string | null;
}

const API_BASE_URL = "http://localhost:3000/api";

const initialState: HousingState = {
  housingDetails: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchHousingDetails = createAsyncThunk(
  "housing/fetchHousingDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/user/housing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.housingDetails;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch housing details"
      );
    }
  }
);

const housingSlice = createSlice({
  name: "housing",
  initialState,
  reducers: {
    clearHousingDetails: (state) => {
      state.housingDetails = null;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHousingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHousingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.housingDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchHousingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearHousingDetails, resetError } = housingSlice.actions;
export default housingSlice.reducer;
