import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPersonalInfo, updatePersonalInfo } from './personalInfoThunks';

import { PersonalInfo } from '../shared/types';

export type Document = {
  type: string;
  fileUrl: string;
  fileKey: string;
  status: 'pending' | 'approved' | 'rejected';
};

const initialState: PersonalInfo = {
  userId: '',
  firstName: '',
  lastName: '',
  middleName: '',
  preferredName: '',
  // gender: '',
  dob: '',
  buildingNumber: '',
  streetName: '',
  city: '',
  state: '',
  zipCode: '',
  work: '',
  cell: '',
  SSN: null,
  make: '',
  model: '',
  color: '',
  hasLicense: null,
  // number: '',
  expirationDate: '',
  // licenseDocument: '',
  residencyStatus: '',
  // visaType: '',
  startDate: '',
  endDate: '',
  employementDocuments: [],
  // reference: null,
  emergencyContact: [],
  profilePicture: ''
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
