import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPersonalInfo, updatePersonalInfo } from './personalInfoThunks';

export type Document = {
  type: string;
  fileUrl: string;
  fileKey: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type PersonalInfo = {
  name: {
    firstName: string;
    lastName: string;
    middleName: string | '';
    preferredName: string | '';
  };
  profilePicture?: string;
  email: string;
  SSN: string;
  dob: Date | string;
  gender: 'male' | 'female' | 'noAnswer';
  address: {
    buildingNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: {
    cell: string;
    work: string | null;
  };
  employment: {
    residencyStatus: 'citizen' | 'greenCard' | 'nonresident' | null;
    visaType?: 'H1-B' | 'L2' | 'F1-CPT' | 'F1-OPT' | 'H4' | null;
    startDate?: string;
    endDate?: string;
    documents?: string[];
  };
  carInfo?: {
    make?: string;
    model?: string;
    color?: string;
  };
  driversLicense: {
    hasLicense: boolean;
    number?: string;
    expirationDate?: Date;
    document?: string;
  };
  reference?: {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email: string;
    relationship: string;
  };
  emergencyContacts: Array<{
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email: string;
    relationship: string;
  }>;
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
