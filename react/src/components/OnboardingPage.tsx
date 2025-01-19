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
  TextField,
  Typography
} from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { ContactDetails, Onboarding } from '../store/shared/types';
import {
  OnboardingValidationErrors,
  validateOnboarding
} from './shared/infoValidation';
import React, { useEffect, useState } from 'react';
import {
  fetchOnboarding,
  updateOnboarding
} from '../store/onboardingSlice/onboardingThunks';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import { DocumentsSection } from './DocumentSection';
import { US_STATES } from './shared/constants';
import { useNavigate } from 'react-router-dom';

const OnboardingPage: React.FC = () => {
  const onboarding = useSelector((state: RootState) => state.onboarding);
  const { isLoggedIn, loading, user } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [localData, setLocalData] = useState<Onboarding>(onboarding);
  const [errors, setErrors] = useState<OnboardingValidationErrors>({});

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        dispatch(fetchOnboarding());
      }
    }
  }, [loading, isLoggedIn, dispatch, navigate]);

  useEffect(() => {
    if (onboarding.status === 'approved') {
      navigate('/dashboard');
    }
  }, [onboarding.status, navigate]);

  useEffect(() => {
    setLocalData(onboarding);
  }, [onboarding]);

  const userEmail = user?.email;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { [e.target.name]: _, ...restErrors } = errors;
    setErrors(restErrors);
    const newData = {
      ...localData,
      [e.target.name]: e.target.value
    };
    setLocalData(newData);
  };

  const formatDateForInput = (date: string | Date | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleSave = async () => {
    console.log(JSON.stringify(localData));
    const validationErrors = validateOnboarding(localData);
    if (Object.keys(validationErrors).length === 0) {
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
          document: localData.licenseDocument || null
        },
        employment: {
          residencyStatus: localData.residencyStatus,
          visaType:
            localData.residencyStatus === 'nonresident'
              ? localData.visaType
              : null,
          otherVisaTitle:
            localData.visaType === 'Other' ? localData.otherVisaTitle : null,
          startDate: localData.startDate || null,
          endDate: localData.endDate || null,
          documents: localData.employementDocuments || null
        },
        dob: localData.dob,
        SSN: localData.SSN,
        gender: localData.gender,
        profilePicture: localData.profilePicture || undefined,
        reference: localData.reference || null,
        emergencyContact: localData.emergencyContact,
        status: 'pending' as const
      };

      try {
        await dispatch(updateOnboarding(unflattened)).unwrap();
        await dispatch(fetchOnboarding()).unwrap();
      } catch (error) {
        console.error('Error saving onboarding:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isPending = localData.status === 'pending';
  const isRejected = localData.status === 'rejected';
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 5 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Typography variant='h4'>Onboard Application</Typography>
        <Button variant='contained' onClick={handleSave} disabled={isPending}>
          Submit
        </Button>
      </Box>

      {isPending && (
        <Alert severity='info' sx={{ mb: 4 }}>
          Please wait for HR to review your application.
        </Alert>
      )}

      {isRejected && (
        <Alert severity='error' sx={{ mb: 4 }}>
          Your application has been rejected. Please make necessary changes and
          submit again.
        </Alert>
      )}

      {/* DOCUMENTS PREVIEWS */}
      {isPending && <DocumentsSection isEditing={false} />}

      {/* NAME */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Name
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={12} display='flex' alignItems='center' gap={2}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                border: '1px solid #ccc'
              }}
            />
            <Button
              variant='contained'
              component='label'
              size='small'
              disabled={isPending}
            >
              Upload Photo
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={handleChange}
              />
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='firstName'
              label='First Name'
              value={localData.firstName}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='lastName'
              label='Last Name'
              value={localData.lastName}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='middleName'
              label='Middle Name'
              value={localData.middleName}
              onChange={handleChange as React.ChangeEventHandler}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='preferredName'
              label='Preferred Name'
              value={localData.preferredName}
              onChange={handleChange as React.ChangeEventHandler}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='email'
              label='Email'
              value={userEmail}
              disabled={true}
            />
          </Grid2>

          <Grid2 size={6}>
            <TextField
              fullWidth
              name='SSN'
              label='SSN'
              value={localData.SSN}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.SSN)}
              helperText={errors.SSN}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='dob'
              type='date'
              value={formatDateForInput(localData.dob)}
              label='Birthday'
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.dob)}
              helperText={errors.dob}
              disabled={isPending}
            />
          </Grid2>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id='gender-select-label'>Gender</InputLabel>
            <Select
              labelId='gender-select-label'
              id='gender-select'
              name='gender'
              value={localData.gender || ''}
              label='Gender'
              onChange={handleChange as (event: SelectChangeEvent) => void}
              disabled={isPending}
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
              name='streetName'
              label='Street Name'
              value={localData.streetName}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.streetName)}
              helperText={errors.streetName}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name='buildingNumber'
              label='Building/Apartment #'
              value={localData.buildingNumber}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.buildingNumber)}
              helperText={errors.buildingNumber}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name='city'
              label='City'
              value={localData.city}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.city)}
              helperText={errors.city}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={2}>
            <FormControl fullWidth>
              <InputLabel id='state-select-label'>State</InputLabel>
              <Select
                labelId='state-select-label'
                id='state-select'
                value={localData.state}
                name='state'
                label='State'
                onChange={handleChange as (event: SelectChangeEvent) => void}
                error={Boolean(errors.state)}
                disabled={isPending}
              >
                {US_STATES.map((state) => (
                  <MenuItem key={state.code} value={state.code}>
                    {state.code}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && (
                <FormHelperText error>{errors.state}</FormHelperText>
              )}
            </FormControl>
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name='zipCode'
              label='Zip Code'
              value={localData.zipCode}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.zipCode)}
              helperText={errors.zipCode}
              disabled={isPending}
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
              name='cell'
              label='Cell Phone #'
              value={localData.cell}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.cell)}
              helperText={errors.cell}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='work'
              label='Work Phone #'
              value={localData.work}
              onChange={handleChange as React.ChangeEventHandler}
              error={Boolean(errors.work)}
              helperText={errors.work}
              disabled={isPending}
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
                name='residencyStatus'
                value={localData.residencyStatus}
                label='Residency Status'
                onChange={handleChange as (event: SelectChangeEvent) => void}
                error={Boolean(errors.residencyStatus)}
                disabled={isPending}
              >
                <MenuItem value='citizen'>Citizen</MenuItem>
                <MenuItem value='greenCard'>Permanent Resident</MenuItem>
                <MenuItem value='nonresident'>Non-Resident</MenuItem>
              </Select>
              {errors.residencyStatus && (
                <FormHelperText error>{errors.residencyStatus}</FormHelperText>
              )}
            </FormControl>
          </Grid2>
          {localData.residencyStatus === 'nonresident' && (
            <>
              <Grid2 size={6}>
                <FormControl fullWidth error={Boolean(errors.visaType)}>
                  <InputLabel id='visa-select-label'>Visa Type</InputLabel>
                  <Select
                    labelId='visa-select-label'
                    id='visa-select'
                    name='visaType'
                    value={localData.visaType || ''}
                    label='Visa Type'
                    onChange={
                      handleChange as (event: SelectChangeEvent) => void
                    }
                    disabled={isPending}
                  >
                    <MenuItem value='H1-B'>H1-B</MenuItem>
                    <MenuItem value='L2'>L2</MenuItem>
                    <MenuItem value='F1(CPT/OPT)'>F1(CPT/OPT)</MenuItem>
                    <MenuItem value='H4'>H4</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                  </Select>
                  {errors.visaType && (
                    <FormHelperText error>{errors.visaType}</FormHelperText>
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
                  disabled={isPending}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  name='startDate'
                  type='date'
                  value={formatDateForInput(localData.startDate)}
                  label='Start Date'
                  slotProps={{ inputLabel: { shrink: true } }}
                  onChange={handleChange as React.ChangeEventHandler}
                  error={Boolean(errors.startDate)}
                  helperText={errors.startDate}
                  disabled={isPending}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  name='endDate'
                  type='date'
                  value={formatDateForInput(localData.endDate)}
                  label='End Date'
                  slotProps={{ inputLabel: { shrink: true } }}
                  onChange={handleChange as React.ChangeEventHandler}
                  error={Boolean(errors.endDate)}
                  helperText={errors.endDate}
                  disabled={isPending}
                />
              </Grid2>
              <Grid2
                size={6}
                sx={{
                  display:
                    localData.visaType === 'F1(CPT/OPT)' ? 'block' : 'none'
                }}
              >
                <Button
                  variant='contained'
                  component='label'
                  size='medium'
                  disabled={isPending}
                >
                  Upload OPT Receipt
                  <input
                    type='file'
                    hidden
                    accept='image/*'
                    onChange={handleChange}
                  />
                </Button>
              </Grid2>
            </>
          )}
        </Grid2>
      </Box>

      {/* CAR INFO */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Car Info
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={5}>
            <FormControl fullWidth>
              <InputLabel id='license-select-label'>
                Do you have a license?
              </InputLabel>
              <Select
                labelId='license-select-label'
                id='license-select'
                name='hasLicense'
                value={localData.hasLicense || ''}
                label="Driver's License"
                onChange={handleChange as (event: SelectChangeEvent) => void}
                error={Boolean(errors.hasLicense)}
                disabled={isPending}
              >
                <MenuItem value='yes'>Yes</MenuItem>
                <MenuItem value='no'>No</MenuItem>
              </Select>
              {errors.hasLicense && (
                <FormHelperText error>{errors.hasLicense}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2
            size={6}
            sx={{ display: localData.hasLicense === 'yes' ? 'block' : 'none' }}
          >
            <TextField
              fullWidth
              name='number'
              label='Number'
              value={localData.number}
              onChange={handleChange as React.ChangeEventHandler}
              disabled={isPending}
            />
          </Grid2>
          <Grid2
            size={6}
            sx={{ display: localData.hasLicense === 'yes' ? 'block' : 'none' }}
          >
            <TextField
              fullWidth
              type='date'
              name='expirationDate'
              value={formatDateForInput(localData.expirationDate)}
              slotProps={{ inputLabel: { shrink: true } }}
              label='Expiration Date'
              onChange={handleChange as React.ChangeEventHandler}
              disabled={isPending}
            />
          </Grid2>
          <Grid2
            size={6}
            sx={{ display: localData.hasLicense === 'yes' ? 'block' : 'none' }}
          >
            <Button
              variant='contained'
              component='label'
              size='medium'
              disabled={isPending}
            >
              Upload License
              <input
                type='file'
                hidden
                accept='image/*'
                // value={localData.licenseDocument}
                onChange={handleChange}
                disabled={isPending}
              />
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='make'
              label='Car Make'
              value={localData.make}
              onChange={handleChange as React.ChangeEventHandler}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='model'
              label='Car Model'
              value={localData.model}
              onChange={handleChange as React.ChangeEventHandler}
              disabled={isPending}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='color'
              label='Car Color'
              value={localData.color}
              onChange={handleChange as React.ChangeEventHandler}
              disabled={isPending}
            />
          </Grid2>
        </Grid2>
      </Box>

      {/* REFERENCE */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Reference
        </Typography>
        <Box sx={{ mb: 3, position: 'relative' }}>
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <TextField
                fullWidth
                name='reference.firstName'
                label='First Name'
                value={localData.reference?.firstName}
                onChange={handleChange as React.ChangeEventHandler}
                disabled={isPending}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                name='reference.lastName'
                label='Last Name'
                value={localData.reference?.lastName}
                onChange={handleChange as React.ChangeEventHandler}
                disabled={isPending}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                label='Middle Name'
                name='reference.middleName'
                value={localData.reference?.middleName}
                onChange={handleChange as React.ChangeEventHandler}
                disabled={isPending}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                fullWidth
                label='Phone'
                name='reference.phone'
                value={localData.reference?.phone}
                onChange={handleChange as React.ChangeEventHandler}
                error={Boolean(errors.reference?.phone)}
                helperText={errors.reference?.phone}
                disabled={isPending}
              />
            </Grid2>
            <Grid2 size={5}>
              <TextField
                fullWidth
                label='Email'
                name='reference.email'
                value={localData.reference?.email}
                onChange={handleChange as React.ChangeEventHandler}
                error={Boolean(errors.reference?.email)}
                helperText={errors.reference?.email}
                disabled={isPending}
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                fullWidth
                label='Relationship'
                name='reference.relationship'
                value={localData.reference?.relationship}
                onChange={handleChange as React.ChangeEventHandler}
                disabled={isPending}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      {/* EMERGENCY CONTACT */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant='h6' sx={{ mb: 2 }}>
            Emergency Contact
          </Typography>
          {errors.emergencyContactRequired && (
            <FormHelperText error>
              {errors.emergencyContactRequired}
            </FormHelperText>
          )}
        </Box>
        {localData.emergencyContact.map((contact: ContactDetails, index) => (
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
              <IconButton
                color='error'
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
                disabled={isPending}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid2 container spacing={2}>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='First Name'
                  value={contact.firstName}
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
                  disabled={isPending}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Last Name'
                  value={contact.lastName}
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
                  disabled={isPending}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Middle Name'
                  value={contact.middleName || ''}
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
                  disabled={isPending}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Phone'
                  value={contact.phone}
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
                  disabled={isPending}
                />
              </Grid2>
              <Grid2 size={5}>
                <TextField
                  fullWidth
                  label='Email'
                  value={contact.email}
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
                  disabled={isPending}
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  fullWidth
                  label='Relationship'
                  value={contact.relationship}
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
                  disabled={isPending}
                />
              </Grid2>
            </Grid2>
          </Box>
        ))}
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
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
          disabled={isPending}
        >
          Add Emergency Contact
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingPage;
