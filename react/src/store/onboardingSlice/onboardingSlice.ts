import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchOnboarding, updateOnboarding } from './onboardingThunks';

import { Onboarding } from '../shared/types';

const initialState: Onboarding = {
  userId: '',
  status: 'pending',
  firstName: '',
  lastName: '',
  middleName: '',
  preferredName: '',
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
  residencyStatus: '',
  employementDocuments: [],
  emergencyContact: [],
  profilePicture: ''
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    update: (state, updates: PayloadAction<Partial<Onboarding>>) => ({
      ...state,
      ...updates
    }),
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnboarding.fulfilled, (_state, action) => action.payload)
      .addCase(
        updateOnboarding.fulfilled,
        (_state, action) => action.payload
      );
  }
});


export const { update } = onboardingSlice.actions;

export default onboardingSlice.reducer;
