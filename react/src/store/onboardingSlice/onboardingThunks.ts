import type { Onboarding } from "./onboardingSlice";
import { axiosInstance } from "../../interceptor/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchOnboarding = createAsyncThunk(
  "onboarding/fetchOnboarding",
  async () => {
    //validate the JWT token
    const response = await axiosInstance.get(
      "/onboarding"
    );
    console.log(response);
    return response.data;
  }
);

const updateOnboarding = createAsyncThunk(
  "onboarding/updateOnboarding",
  async (updates: Partial<Onboarding>) => {
    //validate the JWT token
    const response = await axiosInstance.put(
      "/onboarding/update",
      { updates }
    );
    return response.data;
  }
);

export { fetchOnboarding, updateOnboarding };
