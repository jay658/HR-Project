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
import React, { useEffect, useState } from 'react';
import {
  ValidationErrors,
  validatePersonalInfo
} from '../utils/personalInfoValidation';
import {
  fetchPersonalInfo,
  updatePersonalInfo,
  updateSSN
} from '../store/personalInfoSlice/personalInfoThunks';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import { DocumentsSection } from './DocumentSection';
import type { PersonalInfo } from '../types/PersonalInfo';

const US_STATES = [
  { code: 'AL' },
  { code: 'AK' },
  { code: 'AZ' },
  { code: 'AR' },
  { code: 'CA' },
  { code: 'CO' },
  { code: 'CT' },
  { code: 'DE' },
  { code: 'FL' },
  { code: 'GA' },
  { code: 'HI' },
  { code: 'ID' },
  { code: 'IL' },
  { code: 'IN' },
  { code: 'IA' },
  { code: 'KS' },
  { code: 'KY' },
  { code: 'LA' },
  { code: 'ME' },
  { code: 'MD' },
  { code: 'MA' },
  { code: 'MI' },
  { code: 'MN' },
  { code: 'MS' },
  { code: 'MO' },
  { code: 'MT' },
  { code: 'NE' },
  { code: 'NV' },
  { code: 'NH' },
  { code: 'NJ' },
  { code: 'NM' },
  { code: 'NY' },
  { code: 'NC' },
  { code: 'ND' },
  { code: 'OH' },
  { code: 'OK' },
  { code: 'OR' },
  { code: 'PA' },
  { code: 'RI' },
  { code: 'SC' },
  { code: 'SD' },
  { code: 'TN' },
  { code: 'TX' },
  { code: 'UT' },
  { code: 'VT' },
  { code: 'VA' },
  { code: 'WA' },
  { code: 'WV' },
  { code: 'WI' },
  { code: 'WY' }
] as const;

const PersonalInfoPage: React.FC = () => {
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const dispatch = useDispatch<AppDispatch>();

  const [localData, setLocalData] = useState<PersonalInfo>(personalInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

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

  const handleSaveAll = async () => {
    const validationErrors = validatePersonalInfo(localData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setNotification({
        open: true,
        message: 'Please fix the validation errors before saving.',
        severity: 'error'
      });
      return;
    }

    try {
      await dispatch(updatePersonalInfo(localData));
      if (localData.SSN !== personalInfo.SSN) {
        await dispatch(updateSSN(localData.SSN));
      }
      setIsEditing(false);
      setNotification({
        open: true,
        message: 'Changes saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.log(`Failed to save changes in personal info page: ${error}`);
      setNotification({
        open: true,
        message: 'Failed to save changes. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCancelAll = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      setLocalData(personalInfo);
      setIsEditing(false);
    }
  };

  const formatDateForInput = (date: string | Date | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setLocalData({
      ...localData,
      gender: event.target.value as 'male' | 'female' | 'noAnswer'
    });
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    console.log('State changed:', event.target.value);
    setLocalData({
      ...localData,
      address: {
        ...localData.address,
        state: event.target.value
      }
    });
  };

  const handleResidencyStatusChange = (event: SelectChangeEvent) => {
    console.log('Residency status changed:', event.target.value);
    setLocalData({
      ...localData,
      employment: {
        ...localData.employment,
        residencyStatus: event.target.value as
          | 'citizen'
          | 'greenCard'
          | 'nonresident'
      }
    });
  };

  const handleVisaTypeChange = (event: SelectChangeEvent) => {
    console.log('Visa type changed:', event.target.value);
    setLocalData({
      ...localData,
      employment: {
        ...localData.employment,
        visaType: event.target.value as
          | 'H1-B'
          | 'L2'
          | 'F1-CPT'
          | 'F1-OPT'
          | 'H4'
      }
    });
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

      {/* NAME */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Name
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={12} display='flex' alignItems='center' gap={2}>
            <Avatar
              // await s3 setup
              // src={personalInfo.profilePicture?.url}
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // await s3 setup
                      console.log(`Upload file: ${file}`);
                    }
                  }}
                />
              </Button>
            )}
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='First Name'
              value={localData.name.firstName}
              // enable when we are in editing state
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  name: { ...localData.name, firstName: e.target.value }
                })
              }
              error={Boolean(errors.name?.firstName)}
              helperText={errors.name?.firstName}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Last Name'
              value={localData.name.lastName}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  name: { ...localData.name, lastName: e.target.value }
                })
              }
              error={Boolean(errors.name?.lastName)}
              helperText={errors.name?.lastName}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Middle Name'
              value={localData.name.middleName}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  name: { ...localData.name, middleName: e.target.value }
                })
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Preferred Name'
              value={localData.name.preferredName}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  name: { ...localData.name, preferredName: e.target.value }
                })
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Email'
              value={localData.email}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  email: e.target.value
                })
              }
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='SSN'
              value={localData.SSN}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  SSN: e.target.value
                })
              }
              error={Boolean(errors.SSN)}
              helperText={errors.SSN}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              type='date'
              label='Birthday'
              value={formatDateForInput(localData.dob)}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  dob: e.target.value
                })
              }
              error={Boolean(errors.dob)}
              helperText={errors.dob}
            />
          </Grid2>
          <FormControl>
            <InputLabel id='gender-select-label'>Gender</InputLabel>
            <Select
              labelId='gender-select-label'
              id='gender-select'
              value={localData.gender}
              disabled={!isEditing}
              label='Gender'
              onChange={handleGenderChange}
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
              label='Street'
              value={localData.address.streetName}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  address: {
                    ...localData.address,
                    streetName: e.target.value
                  }
                })
              }
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              label='Building/Apartment #'
              value={localData.address.buildingNumber}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  address: {
                    ...localData.address,
                    buildingNumber: e.target.value
                  }
                })
              }
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              label='City'
              value={localData.address.city}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  address: {
                    ...localData.address,
                    city: e.target.value
                  }
                })
              }
            />
          </Grid2>
          <Grid2 size={2}>
            <FormControl fullWidth>
              <InputLabel id='state-select-label'>State</InputLabel>
              <Select
                labelId='state-select-label'
                id='state-select'
                value={localData.address.state}
                disabled={!isEditing}
                label='State'
                onChange={handleStateChange}
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
              label='Zip Code'
              value={localData.address.zipCode}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  address: {
                    ...localData.address,
                    zipCode: e.target.value
                  }
                })
              }
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
              label='Cell Phone #'
              value={localData.phone.cell}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  phone: {
                    ...localData.phone,
                    cell: e.target.value
                  }
                })
              }
              error={Boolean(errors.phone?.cell)}
              helperText={errors.phone?.cell}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Work Phone #'
              value={localData.phone.work}
              disabled={!isEditing}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  phone: {
                    ...localData.phone,
                    work: e.target.value
                  }
                })
              }
              error={Boolean(errors.phone?.work)}
              helperText={errors.phone?.work}
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
                value={localData.employment.residencyStatus || ''}
                disabled={!isEditing}
                label='Residency Status'
                onChange={handleResidencyStatusChange}
              >
                <MenuItem value='citizen'>Citizen</MenuItem>
                <MenuItem value='greenCard'>Permanent Resident</MenuItem>
                <MenuItem value='nonresident'>Non-Resident</MenuItem>
              </Select>
              {errors.employment?.residencyStatus && (
                <FormHelperText>
                  {errors.employment.residencyStatus}
                </FormHelperText>
              )}
            </FormControl>
          </Grid2>
          {localData.employment.residencyStatus === 'nonresident' && (
            <>
              <Grid2 size={6}>
                <FormControl fullWidth>
                  <InputLabel id='visa-select-label'>Visa Type</InputLabel>
                  <Select
                    labelId='visa-select-label'
                    id='visa-select'
                    value={localData.employment.visaType || ''}
                    disabled={!isEditing}
                    label='Visa Type'
                    onChange={handleVisaTypeChange}
                  >
                    <MenuItem value='H1-B'>H1-B</MenuItem>
                    <MenuItem value='L2'>L2</MenuItem>
                    <MenuItem value='F1-CPT'>F1-CPT</MenuItem>
                    <MenuItem value='F1-OPT'>F1-OPT</MenuItem>
                    <MenuItem value='H4'>H4</MenuItem>
                  </Select>
                  {errors.employment?.visaType && (
                    <FormHelperText>
                      {errors.employment.visaType}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Start Date'
                  value={formatDateForInput(localData.employment.startDate)}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      employment: {
                        ...localData.employment,
                        startDate: e.target.value
                      }
                    })
                  }
                  error={Boolean(errors.employment?.startDate)}
                  helperText={errors.employment?.startDate}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='End Date'
                  value={formatDateForInput(localData.employment.endDate)}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      employment: {
                        ...localData.employment,
                        endDate: e.target.value
                      }
                    })
                  }
                  error={Boolean(errors.employment?.endDate)}
                  helperText={errors.employment?.endDate}
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
        {errors.emergencyContacts?.[0]?.firstName && (
          <Typography color='error'>
            {errors.emergencyContacts[0].firstName}
          </Typography>
        )}
        {localData.emergencyContacts.map((contact, index) => (
          <Box
            key={index}
            sx={{
              mb: index !== localData.emergencyContacts.length - 1 ? 3 : 0,
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
                    // NOTE: do we want custom stylings (i.e. using mui) for these
                    // pop up windows?
                    if (
                      window.confirm(
                        'Are you sure you want to delete this emergency contact?'
                      )
                    ) {
                      const updatedContacts =
                        localData.emergencyContacts.filter(
                          (_, i) => i !== index
                        );
                      setLocalData({
                        ...localData,
                        emergencyContacts: updatedContacts
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
                    const updatedContacts = [...localData.emergencyContacts];
                    updatedContacts[index] = {
                      ...contact,
                      firstName: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContacts: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContacts?.[index]?.firstName)}
                  helperText={errors.emergencyContacts?.[index]?.firstName}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Last Name'
                  value={contact.lastName}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContacts];
                    updatedContacts[index] = {
                      ...contact,
                      lastName: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContacts: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContacts?.[index]?.lastName)}
                  helperText={errors.emergencyContacts?.[index]?.lastName}
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Middle Name'
                  value={contact.middleName || ''}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContacts];
                    updatedContacts[index] = {
                      ...contact,
                      middleName: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContacts: updatedContacts
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
                    const updatedContacts = [...localData.emergencyContacts];
                    updatedContacts[index] = {
                      ...contact,
                      phone: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContacts: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContacts?.[index]?.phone)}
                  helperText={errors.emergencyContacts?.[index]?.phone}
                />
              </Grid2>
              <Grid2 size={5}>
                <TextField
                  fullWidth
                  label='Email'
                  value={contact.email}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContacts];
                    updatedContacts[index] = {
                      ...contact,
                      email: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContacts: updatedContacts
                    });
                  }}
                  error={Boolean(errors.emergencyContacts?.[index]?.email)}
                  helperText={errors.emergencyContacts?.[index]?.email}
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  fullWidth
                  label='Relationship'
                  value={contact.relationship}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedContacts = [...localData.emergencyContacts];
                    updatedContacts[index] = {
                      ...contact,
                      relationship: e.target.value
                    };
                    setLocalData({
                      ...localData,
                      emergencyContacts: updatedContacts
                    });
                  }}
                  error={Boolean(
                    errors.emergencyContacts?.[index]?.relationship
                  )}
                  helperText={errors.emergencyContacts?.[index]?.relationship}
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
                emergencyContacts: [
                  ...localData.emergencyContacts,
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

      {/* DOCUMENTS */}
      <Box sx={{ mb: 4 }}>
        <DocumentsSection isEditing={isEditing} />
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
