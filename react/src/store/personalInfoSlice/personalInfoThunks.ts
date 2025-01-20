import { PersonalInfo } from '../../types/PersonalInfo';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPersonalInfo = createAsyncThunk(
  'personalInfo/fetchPersonalInfo',
  async () => {
    const response = await axios.get(
      'http://localhost:3000/api/employee/personalInfo'
    );
    return response.data;
  }
);

export const updatePersonalInfo = createAsyncThunk(
  'personalInfo/updatePersonalInfo',
  async (updates: Partial<PersonalInfo>) => {
    const response = await axios.put(
      'http://localhost:3000/api/employee/personalInfo/update',
      { updates }
    );
    return response.data;
  }
);
