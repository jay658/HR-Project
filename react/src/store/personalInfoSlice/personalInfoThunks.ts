import { PersonalInfo } from '../../types/PersonalInfo';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateSSN = createAsyncThunk(
  'personalInfo/updateSSN',
  async (ssn: string) => {
    const response = await axios.put(
      'http://localhost:3000/api/personalInfo/updateSSN',
      { SSN: ssn }
    );
    return response.data;
  }
);

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