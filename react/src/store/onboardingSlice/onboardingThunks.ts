import type { Onboarding } from '../shared/types';
import { axiosInstance } from '../../interceptor/interceptor';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchOnboarding = createAsyncThunk(
  'onboarding/fetchOnboarding',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/onboarding');

      if (!response.data) {
        return null;
      }

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
        licenseDocument: response.data.driversLicense.document ? {
          fileUrl: response.data.driversLicense.document.fileUrl,
          fileKey: response.data.driversLicense.document.fileKey,
          type: response.data.driversLicense.document.type
        } : null,
        residencyStatus: response.data.employment.residencyStatus,
        visaType: response.data.employment.visaType || '',
        otherVisaTitle: response.data.employment.otherVisaTitle || '',
        startDate: response.data.employment.startDate || '',
        endDate: response.data.employment.endDate || '',
        employementDocuments: response.data.employment.documents ? 
          response.data.employment.documents.map((doc: any) => ({
            fileUrl: doc.fileUrl,
            fileKey: doc.fileKey,
            type: doc.type
          })) 
          : [],
        dob: response.data.dob,
        SSN: response.data.SSN,
        gender: response.data.gender || null,
        profilePicture: response.data.profilePicture ? {
          fileUrl: response.data.profilePicture.fileUrl,
          fileKey: response.data.profilePicture.fileKey,
          type: response.data.profilePicture.type
        } : null,
        reference: response.data.reference,
        emergencyContact: response.data.emergencyContact,
        loading: false,
        error: null
      };
    } catch (error: any) {
      console.error('Onboarding fetch error:', error);
      // If 404 (no onboarding record exists), return null instead of rejecting
      if (error.response?.status === 404) {
        return null;
      }
      return rejectWithValue('Failed to fetch onboarding data');
    }
  }
);

const uploadDocument = createAsyncThunk(
  'onboarding/uploadDocument',
  async ({ file, type }: { file: File; type: string }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await axiosInstance.post('/onboarding/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return {
        type,
        documentId: response.data.documentId,
        fileUrl: response.data.fileUrl
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      return rejectWithValue('Failed to upload document');
    }
  }
);

const updateOnboarding = createAsyncThunk(
  'onboarding/updateOnboarding',
  async (
    { data, files }: { 
      data: Partial<Onboarding>; 
      files?: { [key: string]: File } 
    }, 
    { dispatch, rejectWithValue }
  ) => {
    try {
      const updatedData = { ...data };
      
      // handle file uploads first if any
      if (files && Object.keys(files).length > 0) {
        const uploadResults = await Promise.all(
          Object.entries(files).map(([type, file]) =>
            dispatch(uploadDocument({ file, type })).unwrap()
          )
        );

        // only update document fields if new files were uploaded
        uploadResults.forEach(({ type, documentId }) => {
          switch (type) {
            case 'driverLicense':
              updatedData.licenseDocument = documentId;
              break;
            case 'optReceipt':
              updatedData.employementDocuments = documentId;
              break;
            case 'profilePicture':
              updatedData.profilePicture = documentId;
              break;
          }
        });
      }

      // remove document fields from update if no new files
      if (!files || !Object.keys(files).length) {
        delete updatedData.licenseDocument;
        delete updatedData.employementDocuments;
        delete updatedData.profilePicture;
      }

      const serializedData = {
        ...updatedData,
        dob: updatedData.dob instanceof Date ? updatedData.dob.toISOString() : updatedData.dob,
        expirationDate: updatedData.expirationDate instanceof Date ? 
          updatedData.expirationDate.toISOString() : updatedData.expirationDate,
        startDate: updatedData.startDate instanceof Date ? 
          updatedData.startDate.toISOString() : updatedData.startDate,
        endDate: updatedData.endDate instanceof Date ? 
          updatedData.endDate.toISOString() : updatedData.endDate
      };

      const response = await axiosInstance.put('/onboarding/update', {
        updates: serializedData
      });

      return response.data;
    } catch (error: any) {
      console.error('Update error:', error.response?.data);
      return rejectWithValue(error.response?.data || 'Failed to update onboarding');
    }
  }
);

export { fetchOnboarding, updateOnboarding, uploadDocument };
