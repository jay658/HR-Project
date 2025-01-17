import type { Onboarding } from '../shared/types';
import { axiosInstance } from '../../interceptor/interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchOnboarding = createAsyncThunk(
  'onboarding/fetchOnboarding',
  async () => {
    //validate the JWT token
    const response = await axiosInstance.get(
      "/onboarding"
    );
    
    return response.data;
  }
);

const updateOnboarding = createAsyncThunk(
  'onboarding/updateOnboarding',
  async (data: Partial<Onboarding>) => {
    // Serialize dates before sending to API
    const serializedData = {
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
      expirationDate:
        data.expirationDate instanceof Date
          ? data.expirationDate.toISOString()
          : data.expirationDate,
      startDate:
        data.startDate instanceof Date
          ? data.startDate.toISOString()
          : data.startDate,
      endDate:
        data.endDate instanceof Date ? data.endDate.toISOString() : data.endDate
    };

    //validate the JWT token
    const response = await axiosInstance.put('/onboarding/update', {
      updates: serializedData
    });

    return response.data;
  }
);

export { fetchOnboarding, updateOnboarding };
