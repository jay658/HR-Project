import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

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

// Initial state
const initialState: HousingState = {
  housingDetails: null,
  loading: false,
  error: null,
};

// Async thunk for fetching housing details
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
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch housing details");
    }
  }
);

// Housing slice
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
      .addCase(
        fetchHousingDetails.fulfilled,
        (state, action: PayloadAction<HousingDetails>) => {
          state.loading = false;
          state.housingDetails = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchHousingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearHousingDetails, resetError } = housingSlice.actions;

// Export selectors
export const selectHousingDetails = (state: RootState) =>
  state.housing.housingDetails;
export const selectHousingLoading = (state: RootState) => state.housing.loading;
export const selectHousingError = (state: RootState) => state.housing.error;

// Export reducer
export default housingSlice.reducer;
