import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchOnboarding, updateOnboarding } from './onboardingThunks';

import { Onboarding } from '../shared/types';

const initialState: Onboarding = {
  userId: '',
  status: null,
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
  SSN: '',
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
    .addCase(fetchOnboarding.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOnboarding.fulfilled, (state, action) => {
      state.loading = false;
        state.error = null;
        if (action.payload) {
          Object.assign(state, action.payload);
        }
    })
    .addCase(fetchOnboarding.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
      // .addCase(fetchOnboarding.fulfilled, (_state, action) => {
      //   return { ...initialState, ...(action.payload || {}) } as Onboarding;
      // })
      .addCase(updateOnboarding.fulfilled, (state, action) => {
        return { ...state, ...(action.payload || {}) } as Onboarding;
      });
  }
});

export const { update } = onboardingSlice.actions;

export default onboardingSlice.reducer;
