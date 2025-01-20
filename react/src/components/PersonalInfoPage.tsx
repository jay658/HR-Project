import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import {
  PersonalInfoValidationErrors,
  validatePersonalInfo
} from './shared/infoValidation';
import React, { useEffect, useState } from 'react';
import {
  fetchPersonalInfo,
  updatePersonalInfo
} from '../store/personalInfoSlice/personalInfoThunks';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import { US_STATES } from './shared/constants';
import type { BasicInfo } from '../store/shared/types';
import { DocumentsSection } from './DocumentSection';

const PersonalInfoPage: React.FC = () => {
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const dispatch = useDispatch<AppDispatch>();

  const [localData, setLocalData] = useState<BasicInfo>(personalInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<PersonalInfoValidationErrors>({});
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: { name: string; url: string } | null;
  }>({
    profilePicture: null,
    driverLicense: null
  });
  const [pendingFiles, setPendingFiles] = useState<{
    [key: string]: File | null;
  }>({
    profilePicture: null,
    driverLicense: null
  });

  useEffect(() => {
    dispatch(fetchPersonalInfo());
  }, [dispatch]);

  useEffect(() => {
    setLocalData(personalInfo);
  }, [personalInfo]);

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    if (!isEditing) return;
    
    const { [e.target.name]: _, ...restErrors } = errors;
    setErrors(restErrors);
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'profilePicture' | 'driverLicense'
  ) => {
    if (!isEditing) return;
    
    const file = event.target.files?.[0];
    if (!file) return;
  
    setPendingFiles(prev => ({
      ...prev,
      [type]: file
    }));
  
    setUploadedFiles(prev => ({
      ...prev,
      [type]: { name: file.name, url: URL.createObjectURL(file) }
    }));
  };

  const handleSaveAll = async () => {
    const validationErrors = validatePersonalInfo(localData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const filesToUpload = Object.fromEntries(
      Object.entries(pendingFiles)
        .filter(([_, file]) => file !== null)
        .map(([key, file]) => [key, file as File])
    );

    const unflattened = {
      name: {
        firstName: localData.firstName,
        lastName: localData.lastName,
        middleName: localData.middleName || null,
        preferredName: localData.preferredName || null
      },
      address: {
        buildingNumber: localData.buildingNumber,
        streetName: localData.streetName,
        city: localData.city,
        state: localData.state,
        zipCode: localData.zipCode
      },
      phone: {
        cell: localData.cell,
        work: localData.work || null
      },
      carInfo: {
        make: localData.make || null,
        model: localData.model || null,
        color: localData.color || null
      },
      driversLicense: {
        hasLicense: localData.hasLicense === 'yes',
        number: localData.hasLicense === 'yes' ? localData.number : null,
        expirationDate: localData.expirationDate || null,
      },
      employment: {
        residencyStatus: localData.residencyStatus,
        visaType: localData.residencyStatus === 'nonresident' ? localData.visaType : null,
        otherVisaTitle: localData.visaType === 'Other' ? localData.otherVisaTitle : null,
        startDate: localData.startDate || null,
        endDate: localData.endDate || null,
      },
      dob: localData.dob,
      SSN: localData.SSN,
      gender: localData.gender,
      reference: localData.reference || null,
      emergencyContact: localData.emergencyContact
    };

    try {
      await dispatch(updatePersonalInfo({ 
        data: unflattened,
        files: filesToUpload
      })).unwrap();
      await dispatch(fetchPersonalInfo()).unwrap();

      setIsEditing(false);
      setPendingFiles({
        profilePicture: null,
        driverLicense: null
      });
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
    
  };

  const handleCancelAll = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      setLocalData(personalInfo);
      setIsEditing(false);
      setPendingFiles({
        profilePicture: null,
        driverLicense: null
      });
      setUploadedFiles({
        profilePicture: null,
        driverLicense: null
      });
      setErrors({});
    }
  };

  const formatDateForInput = (date: string | Date | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Typography variant='h4'>Personal Information</Typography>
        {!isEditing ? (
          <Button variant='contained' onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <Box>
            <Button variant='outlined' onClick={handleCancelAll} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleSaveAll}>
              Save All
            </Button>
          </Box>
        )}
      </Box>

      {/* DOCUMENTS */}
      <Box sx={{ mb: 4 }}>
        <DocumentsSection 
          isEditing={isEditing}
          uploadedFiles={uploadedFiles}
          onboarding={personalInfo}
          localData={localData}
        />
      </Box>

      {/* NAME */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Name
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={12} display='flex' alignItems='center' gap={2}>
            <Avatar
              src={uploadedFiles.profilePicture?.url || personalInfo.profilePicture?.fileUrl}
              sx={{
                width: 100,
                height: 100,
                border: '1px solid #ccc'
              }}
            />
            {isEditing && (
              <Button variant='contained' component='label' size='small'>
                Upload Photo
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={(e) => handleFileSelect(e, 'profilePicture')}
                />
              </Button>
            )}
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              value={localData.firstName}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={localData.lastName}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="middleName"
              label="Middle Name"
              value={localData.middleName}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="preferredName"
              label="Preferred Name"
              value={localData.preferredName}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={localData.email}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="SSN"
              label="SSN"
              value={localData.SSN}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.SSN)}
              helperText={errors.SSN}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              type='date'
              name="dob"
              label='Birthday'
              value={formatDateForInput(localData.dob)}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.dob)}
              helperText={errors.dob}
            />
          </Grid2>
          <FormControl>
            <InputLabel id='gender-select-label'>Gender</InputLabel>
            <Select
              labelId='gender-select-label'
              name="gender"
              value={localData.gender || ''}
              disabled={!isEditing}
              label='Gender'
              onChange={handleChange as (event: SelectChangeEvent) => void}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='noAnswer'>I do not wish to answer</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </Box>

      {/* ADDRESS */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Address
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <TextField
              fullWidth
              name="streetName"
              label="Street"
              value={localData.streetName}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.streetName)}
              helperText={errors.streetName}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name="buildingNumber"
              label="Building/Apartment #"
              value={localData.buildingNumber}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.buildingNumber)}
              helperText={errors.buildingNumber}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={localData.city}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
          </Grid2>
          <Grid2 size={2}>
            <FormControl fullWidth>
              <InputLabel id='state-select-label'>State</InputLabel>
              <Select
                labelId='state-select-label'
                name="state"
                value={localData.state}
                disabled={!isEditing}
                label='State'
                onChange={handleChange as (event: SelectChangeEvent) => void}
              >
                {US_STATES.map((state) => (
                  <MenuItem key={state.code} value={state.code}>
                    {state.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name="zipCode"
              label="Zip Code"
              value={localData.zipCode}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.zipCode)}
              helperText={errors.zipCode}
            />
          </Grid2>
        </Grid2>
      </Box>

      {/* CONTACT INFO */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Contact Information
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="cell"
              label="Cell Phone #"
              value={localData.cell}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.cell)}
              helperText={errors.cell}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="work"
              label="Work Phone #"
              value={localData.work}
              disabled={!isEditing}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.work)}
              helperText={errors.work}
            />
          </Grid2>
        </Grid2>
      </Box>

      {/* EMPLOYMENT */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Employment
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={5}>
            <FormControl fullWidth>
              <InputLabel id='residency-select-label'>
                Residency Status
              </InputLabel>
              <Select
                labelId='residency-select-label'
                id='residency-select'
                value={localData.residencyStatus}
                disabled={!isEditing}
                label='Residency Status'
                onChange={handleChange}
              >
                <MenuItem value='citizen'>Citizen</MenuItem>
                <MenuItem value='greenCard'>Permanent Resident</MenuItem>
                <MenuItem value='nonresident'>Non-Resident</MenuItem>
              </Select>
              {errors.residencyStatus && (
                <FormHelperText>
                  {errors.residencyStatus}
                </FormHelperText>
              )}
            </FormControl>
          </Grid2>
          {localData.residencyStatus === 'nonresident' && (
            <>
              <Grid2 size={6}>
                <FormControl fullWidth>
                  <InputLabel id='visa-select-label'>Visa Type</InputLabel>
                  <Select
                    labelId='visa-select-label'
                    id='visa-select'
                    name='visaType'
                    value={localData.visaType}
                    disabled={!isEditing}
                    label='Visa Type'
                    onChange={handleChange}
                  >
                    <MenuItem value='H1-B'>H1-B</MenuItem>
                    <MenuItem value='L2'>L2</MenuItem>
                    <MenuItem value='F1(CPT/OPT)'>F1(CPT/OPT)</MenuItem>
                    <MenuItem value='H4'>H4</MenuItem>
                    <MenuItem value='Other'>Ohter</MenuItem>
                  </Select>
                  {errors.visaType && (
                    <FormHelperText>
                      {errors.visaType}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid2>
              <Grid2
                size={5}
                sx={{
                  display: localData.visaType === 'Other' ? 'block' : 'none'
                }}
              >
                <TextField
                  fullWidth
                  name='otherVisaTitle'
                  label='Other Visa Title'
                  value={localData.otherVisaTitle}
                  onChange={handleChange as React.ChangeEventHandler}
                  disabled={!isEditing}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  name="startDate"
                  type='date'
                  label='Start Date'
                  value={formatDateForInput(localData.startDate)}
                  disabled={!isEditing}
                  onChange={handleChange as React.ChangeEventHandler}
                  error={Boolean(errors.startDate)}
                  helperText={errors.startDate}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  type='date'
                  name="endDate"
                  label='End Date'
                  value={formatDateForInput(localData.endDate)}
                  disabled={!isEditing}
                  onChange={handleChange as React.ChangeEventHandler}
                  error={Boolean(errors.endDate)}
                  helperText={errors.endDate}
                />
              </Grid2>
            </>
          )}
        </Grid2>
      </Box>

      {/* EMERGENCY CONTACT */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Emergency Contact
        </Typography>
        {errors.emergencyContact?.[0]?.firstName && (
          <Typography color='error'>
            {errors.emergencyContact[0].firstName}
          </Typography>
        )}
        {localData.emergencyContact.map((contact, index) => (
          <Box
            key={index}
            sx={{
              mb: index !== localData.emergencyContact.length - 1 ? 3 : 0,
              position: 'relative'
            }}
          >
            {index > 0 && <Divider sx={{ my: 2 }} />}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1
              }}
            >
              <Typography variant='subtitle1' gutterBottom>
                Contact {index + 1}
              </Typography>
              {isEditing && (
                <IconButton
                  color='error'
                  disabled={!isEditing}
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this emergency contact?'
                      )
                    ) {
                      const updatedContacts = localData.emergencyContact.filter(
                        (_, i) => i !== index
                      );
                      setLocalData({
                        ...localData,
                        emergencyContact: updatedContacts
                      });
                    }
                  }}
                  size='small'
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
            <Grid2 container spacing={2}>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='First Name'
                  value={contact.firstName}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContact];
                    updatedContacts[index] = {
                      ...contact,
                      firstName: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContact: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContact?.[index]?.firstName)}
                  helperText={errors.emergencyContact?.[index]?.firstName}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Last Name'
                  value={contact.lastName}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContact];
                    updatedContacts[index] = {
                      ...contact,
                      lastName: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContact: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContact?.[index]?.lastName)}
                  helperText={errors.emergencyContact?.[index]?.lastName}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Middle Name'
                  value={contact.middleName || ''}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContact];
                    updatedContacts[index] = {
                      ...contact,
                      middleName: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContact: updatedContacts
                    });
                  }}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Phone'
                  value={contact.phone}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContact];
                    updatedContacts[index] = {
                      ...contact,
                      phone: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContact: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContact?.[index]?.phone)}
                  helperText={errors.emergencyContact?.[index]?.phone}
                />
              </Grid2>
              <Grid2 size={5}>
                <TextField
                  fullWidth
                  label='Email'
                  value={contact.email}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContact];
                    updatedContacts[index] = {
                      ...contact,
                      email: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContact: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContact?.[index]?.email)}
                  helperText={errors.emergencyContact?.[index]?.email}
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  fullWidth
                  label='Relationship'
                  value={contact.relationship}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContact];
                    updatedContacts[index] = {
                      ...contact,
                      relationship: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContact: updatedContacts
                    });
                  }}
                  error={Boolean(
                    errors.emergencyContact?.[index]?.relationship
                  )}
                  helperText={errors.emergencyContact?.[index]?.relationship}
                />
              </Grid2>
            </Grid2>
          </Box>
        ))}
        {isEditing && (
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
            disabled={!isEditing}
            onClick={() => {
              setLocalData({
                ...localData,
                emergencyContact: [
                  ...localData.emergencyContact,
                  {
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    phone: '',
                    email: '',
                    relationship: ''
                  }
                ]
              });
            }}
          >
            Add Emergency Contact
          </Button>
        )}
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={2000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PersonalInfoPage;
