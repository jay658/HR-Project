import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPersonalInfo, updatePersonalInfo } from './personalInfoThunks';

import { PersonalInfo } from '../../types/PersonalInfo';

export type Document = {
  type: string;
  fileUrl: string;
  fileKey: string;
  status: 'pending' | 'approved' | 'rejected';
};

const initialState: PersonalInfo = {
  name: {
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: ''
  },
  email: '',
  SSN: '',
  dob: '',
  gender: 'male',
  address: {
    buildingNumber: '',
    streetName: '',
    city: '',
    state: '',
    zipCode: ''
  },
  phone: {
    cell: '',
    work: ''
  },
  employment: {
    residencyStatus: 'citizen'
  },
  driversLicense: {
    hasLicense: false
  },
  emergencyContacts: []
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<PersonalInfo>>) => ({
      ...state,
      ...action.payload
    }),
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalInfo.fulfilled, (_state, action) => action.payload)
      .addCase(
        updatePersonalInfo.fulfilled,
        (_state, action) => action.payload
      );
  }
});

export const { update, reset } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
