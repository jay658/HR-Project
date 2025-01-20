import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { axiosInstance } from "../../interceptor/interceptor";

// Types
export interface IssueComment {
  _id: string;
  description: string;
  createdBy: string;
  timestamp: string;
}

export interface FacilityIssue {
  _id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdBy: string;
  createdAt: string;
  comments: IssueComment[];
}

interface CreateIssuePayload {
  title: string;
  description: string;
}

interface AddCommentPayload {
  facilityIssueId: string;
  comment: string;
}

interface FacilityIssuesState {
  issues: FacilityIssue[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Error handling helper
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return "An unexpected error occurred";
};

// Async Thunks
export const fetchIssuesForUser = createAsyncThunk(
  "facilityIssues/fetchIssuesForUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/facilityIssue/user");
      return response.data as FacilityIssue[];
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const createFacilityIssue = createAsyncThunk(
  "facilityIssues/createFacilityIssue",
  async (issueDetails: CreateIssuePayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/facilityIssue/create", {
        issueDetails,
      });
      return response.data as FacilityIssue;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const addCommentToIssue = createAsyncThunk(
  "facilityIssues/addCommentToIssue",
  async (
    { facilityIssueId, comment }: AddCommentPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/facilityIssue/comment/${facilityIssueId}`, {
        comment,
      });
      return response.data as FacilityIssue;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const closeIssue = createAsyncThunk(
  "facilityIssues/closeIssue",
  async (facilityIssueId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/facilityIssue/close/${facilityIssueId}`);
      return response.data as FacilityIssue;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Initial state
const initialState: FacilityIssuesState = {
  issues: [],
  status: "idle",
  error: null,
};

// Slice
const facilityIssuesSlice = createSlice({
  name: "facilityIssues",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Issues
      .addCase(fetchIssuesForUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchIssuesForUser.fulfilled,
        (state, action: PayloadAction<FacilityIssue[]>) => {
          state.status = "succeeded";
          state.issues = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchIssuesForUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Create Issue
      .addCase(
        createFacilityIssue.fulfilled,
        (state, action: PayloadAction<FacilityIssue>) => {
          state.issues.unshift(action.payload);
          state.error = null;
        }
      )
      .addCase(createFacilityIssue.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Add Comment
      .addCase(
        addCommentToIssue.fulfilled,
        (state, action: PayloadAction<FacilityIssue>) => {
          const index = state.issues.findIndex(
            (issue) => issue._id === action.payload._id
          );
          if (index !== -1) {
            state.issues[index] = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(addCommentToIssue.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Close Issue
      .addCase(
        closeIssue.fulfilled,
        (state, action: PayloadAction<FacilityIssue>) => {
          const index = state.issues.findIndex(
            (issue) => issue._id === action.payload._id
          );
          if (index !== -1) {
            state.issues[index] = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(closeIssue.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetStatus } = facilityIssuesSlice.actions;
export default facilityIssuesSlice.reducer;
