import type { Onboarding } from "./onboardingSlice";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchOnboarding = createAsyncThunk(
  "onboarding/fetchOnboarding",
  async () => {
    //validate the JWT token
    const response = await axios.get(
      "http://localhost:3000/api/employee/onboarding"
    );
    console.log(response);
    return response.data;
  }
);

const updateOnboarding = createAsyncThunk(
  "onboarding/updateOnboarding",
  async (updates: Partial<Onboarding>) => {
    //validate the JWT token
    const response = await axios.put(
      "http://localhost:3000/api/employee/onboarding/update",
      { updates }
    );
    return response.data;
  }
);

export { fetchOnboarding, updateOnboarding };
