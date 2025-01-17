import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchOnboarding, updateOnboarding } from './onboardingThunks';

type ContactDetails = {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  relationship: string;
};

export type Onboarding = {
  userId: string;
  status: 'approved' | 'rejected' | 'pending';
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  gender: 'male' | 'female' | 'noAnswer' | null;
  dob: Date | null;
  buildingNumber: string;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
  work: string;
  cell: string;
  SSN: number | null;
  make: string;
  model: string;
  color: string;
  driversLicense: string;
  residency: 'citizen' | 'permanent resident' | 'nonresident' | null;
  documents: [{ type: string }];
  reference: ContactDetails | null;
  emergencyContact: ContactDetails | null;
  profilePicture: string;
};

const initialState: Onboarding = {
  userId: '',
  status: 'pending',
  firstName: '',
  lastName: '',
  middleName: '',
  preferredName: '',
  gender: '',
  dob: new Date(),
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
  driversLicense: '',
  residency: null,
  documents: [{ type: '' }],
  reference: null,
  emergencyContact: null,
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
    reset: (_state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnboarding.fulfilled, (_state, action) => {
        // If no record exists, return initial state
        return action.payload || initialState;
      })
      .addCase(fetchOnboarding.rejected, (state, _action) => {
        // Return current state if fetch fails
        return state;
      })
      .addCase(updateOnboarding.fulfilled, (_state, action) => {
        return action.payload as Onboarding;
      });
  }
});

export const { update } = onboardingSlice.actions;

export default onboardingSlice.reducer;
