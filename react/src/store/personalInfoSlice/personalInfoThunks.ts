import { PersonalInfo } from './personalInfoSlice';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPersonalInfo = createAsyncThunk(
  'personalInfo/fetchPersonalInfo',
  async () => {
    const response = await axios.get('http://localhost:3000/api/personalInfo');
    return response.data;
  }
);

export const updatePersonalInfo = createAsyncThunk(
  'personalInfo/updatePersonalInfo',
  async (updates: Partial<PersonalInfo>) => {
    const response = await axios.put(
      'http://localhost:3000/api/personalInfo/update',
      { updates }
    );
    return response.data;
  }
);
