import type { Onboarding } from '../shared/types';
import { RootState } from '../store';
import { axiosInstance } from '../../interceptor/interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchOnboarding = createAsyncThunk(
  'onboarding/fetchOnboarding',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axiosInstance.get('/onboarding', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return {
        userId: response.data.userId,
        status: response.data.status,
        firstName: response.data.name.firstName,
        lastName: response.data.name.lastName,
        middleName: response.data.name.middleName || '',
        preferredName: response.data.name.preferredName || '',
        buildingNumber: response.data.address.buildingNumber,
        streetName: response.data.address.streetName,
        city: response.data.address.city,
        state: response.data.address.state,
        zipCode: response.data.address.zipCode,
        cell: response.data.phone.cell,
        work: response.data.phone.work || '',
        make: response.data.carInfo?.make || '',
        model: response.data.carInfo?.model || '',
        color: response.data.carInfo?.color || '',
        hasLicense: response.data.driversLicense.hasLicense ? 'yes' : 'no',
        number: response.data.driversLicense.number || '',
        expirationDate: response.data.driversLicense.expirationDate || '',
        licenseDocument: response.data.driversLicense.document || '',
        residencyStatus: response.data.employment.residencyStatus,
        visaType: response.data.employment.visaType || '',
        otherVisaTitle: response.data.employment.otherVisaTitle || '',
        startDate: response.data.employment.startDate || '',
        endDate: response.data.employment.endDate || '',
        employementDocuments: response.data.employment.documents || [],
        dob: response.data.dob,
        SSN: response.data.SSN,
        gender: response.data.gender,
        profilePicture: response.data.profilePicture || '',
        reference: response.data.reference,
        emergencyContact: response.data.emergencyContact
      };
    } catch (error: any) {
      // If 404 (no onboarding record exists), return null instead of rejecting
      if (error.response?.status === 404) {
        return null;
      }
      return rejectWithValue('Failed to fetch onboarding data');
    }
  }
);

const updateOnboarding = createAsyncThunk(
  'onboarding/updateOnboarding',
  async (data: Partial<Onboarding>) => {
    // serialize dates before sending to API
    const serializedData = {
      ...data,
      dob: data.dob instanceof Date ? data.dob.toISOString() : data.dob,
      expirationDate:
        data.expirationDate instanceof Date
          ? data.expirationDate.toISOString()
          : data.expirationDate,
      startDate:
        data.startDate instanceof Date
          ? data.startDate.toISOString()
          : data.startDate,
      endDate:
        data.endDate instanceof Date ? data.endDate.toISOString() : data.endDate
    };

    //validate the JWT token
    const response = await axiosInstance.put('/onboarding/update', {
      updates: serializedData
    });

    return response.data;
  }
);

export { fetchOnboarding, updateOnboarding };
