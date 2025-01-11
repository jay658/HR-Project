import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchOnboarding, updateOnboarding } from './onboardingThunks';

type ContactDetails = {
  firstName: string,
  lastName: string,
  middleName: string,
  phone: string,
  email: string,
  relationship: string
}

export type Onboarding = {
  userId: string,
  status: 'approved' | 'rejected' | 'pending',
  name: string,
  gender: 'male' | 'female' | 'other' | null,
  dob: Date | null,
  address: string,
  phone: {
    work: string,
    cell: string
  },
  SSN: number | null,
  carInfo: {
    make: string,
    model: string,
    color: string
  },
  driversLicense: string,
  residency: 'citizen' | 'permanent resident' | 'nonresident' | null,
  documents: [{type: string}],
  reference: ContactDetails | null
  emergencyContact: ContactDetails | null,
  profilePicture: string
}

const initialState: Onboarding = {
  userId: '',
  status: 'pending',
  name: '',
  gender: null,
  dob: null,
  address: '',
  phone: {
    work: '',
    cell: ''
  },
  SSN: null,
  carInfo: {
    make: '',
    model: '',
    color: ''
  },
  driversLicense: '',
  residency: null,
  documents: [{type: ''}],
  reference: null,
  emergencyContact: null,
  profilePicture: ''
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    update: (state, updates: PayloadAction<Partial<Onboarding>> ) => ({
      ...state,
      ...updates
    }),
    reset: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOnboarding.fulfilled, (_state, action) => action.payload as Onboarding),
    builder.addCase(updateOnboarding.fulfilled, (_state, action) => action.payload as Onboarding)
  }
});

export const { update } = onboardingSlice.actions;

export default onboardingSlice.reducer;