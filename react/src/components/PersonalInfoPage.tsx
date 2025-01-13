import { AppDispatch, RootState } from '../store/store';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  fetchPersonalInfo,
  updatePersonalInfo,
  updateSSN
} from '../store/personalInfoSlice/personalInfoThunks';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import EditableSection from './EditableSection';
import type { PersonalInfo } from '../store/personalInfoSlice/personalInfoSlice';

// NOTE: should i put this in a separate file?
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

  useEffect(() => {
    dispatch(fetchPersonalInfo());
  }, [dispatch]);

  useEffect(() => {
    setLocalData(personalInfo);
  }, [personalInfo]);

  const handleNameSave = () => {
    dispatch(updatePersonalInfo({ name: localData.name }));
  };

  const handleEmailSave = () => {
    dispatch(updatePersonalInfo({ email: localData.email }));
  };

  const handleSSNSave = () => {
    dispatch(updateSSN(localData.SSN));
  };

  const handleDobSave = () => {
    dispatch(updatePersonalInfo({ dob: localData.dob }));
  };

  const formatDateForInput = (date: string | Date): string => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleGenderSave = () => {
    dispatch(updatePersonalInfo({ gender: localData.gender }));
  };

  const handleAddressSave = () => {
    dispatch(updatePersonalInfo({ address: localData.address }));
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

  const handleContactSave = () => {
    dispatch(updatePersonalInfo({ phone: localData.phone }));
  };

  const handleEmploymentSave = () => {
    dispatch(updatePersonalInfo({ employment: localData.employment }));
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

  const handleEmergencyContactSave = () => {
    dispatch(
      updatePersonalInfo({ emergencyContacts: localData.emergencyContacts })
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant='h4' gutterBottom>
        Personal Information
      </Typography>
      <Typography variant='body1' gutterBottom>
        Update your personal details below.
      </Typography>
      {/* NAME */}
      <EditableSection
        title='Name'
        onSave={handleNameSave}
        onCancel={() => setLocalData(personalInfo)}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='First Name'
              value={localData.name.firstName}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  name: { ...localData.name, firstName: e.target.value }
                })
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Last Name'
              value={localData.name.lastName}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  name: { ...localData.name, lastName: e.target.value }
                })
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Middle Name'
              value={localData.name.middleName}
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
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  name: { ...localData.name, preferredName: e.target.value }
                })
              }
            />
          </Grid2>
        </Grid2>
      </EditableSection>
      {/* PROFILE PICTURE */}
      {/* TODO: display something? */}
      <EditableSection
        title='Profile Picture'
        onSave={handleNameSave}
        onCancel={() => setLocalData(personalInfo)}
      ></EditableSection>
      {/* EMAIL */}
      <EditableSection
        title='Email'
        onSave={handleEmailSave}
        onCancel={() => setLocalData(personalInfo)}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Email'
              value={localData.email}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  email: e.target.value
                })
              }
            />
          </Grid2>
        </Grid2>
      </EditableSection>
      {/* SSN */}
      <EditableSection
        title='Social Security Number'
        onSave={handleSSNSave}
        onCancel={() => setLocalData(personalInfo)}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='SSN'
              value={localData.SSN}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  SSN: e.target.value
                })
              }
            />
          </Grid2>
        </Grid2>
      </EditableSection>
      {/* DOB */}
      {/* TODO: needs to be a date selector */}
      <EditableSection
        title='Date of Birth'
        onSave={handleDobSave}
        onCancel={() => setLocalData(personalInfo)}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              // type='date'
              label='Date of Birth'
              value={formatDateForInput(localData.dob)}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  dob: e.target.value
                })
              }
            />
          </Grid2>
        </Grid2>
      </EditableSection>
      {/* GENDER */}
      <EditableSection
        title='Gender'
        onSave={handleGenderSave}
        onCancel={() => setLocalData(personalInfo)}
      >
        {/* <Grid2 container spacing={2}>
          <Grid2 size={6}> */}
        <FormControl>
          <InputLabel id='gender-select-label'>Gender</InputLabel>
          <Select
            labelId='gender-select-label'
            id='gender-select'
            value={localData.gender}
            label='gender'
            onChange={handleGenderSave}
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='noAnswer'>I do not wish to answer</MenuItem>
          </Select>
        </FormControl>
        {/* </Grid2>
        </Grid2> */}
      </EditableSection>
      {/* ADDRESS */}
      <EditableSection
        title='Address'
        onSave={handleAddressSave}
        onCancel={() => setLocalData(personalInfo)}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <TextField
              fullWidth
              label='Street'
              value={localData.address.streetName}
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
      </EditableSection>
      {/* CONTACT INFO */}
      <EditableSection
        title='Contact Info'
        onSave={handleContactSave}
        onCancel={() => setLocalData(personalInfo)}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Cell Phone #'
              value={localData.phone.cell}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  phone: {
                    ...localData.phone,
                    cell: e.target.value
                  }
                })
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label='Work Phone #'
              value={localData.phone.work}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  phone: {
                    ...localData.phone,
                    work: e.target.value
                  }
                })
              }
            />
          </Grid2>
        </Grid2>
      </EditableSection>
      {/* EMPLOYMENT */}
      <EditableSection
        title='Employment'
        onSave={handleEmploymentSave}
        onCancel={() => setLocalData(personalInfo)}
      >
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
                label='Residency Status'
                onChange={handleResidencyStatusChange}
              >
                <MenuItem value='citizen'>Citizen</MenuItem>
                <MenuItem value='greenCard'>Permanent Resident</MenuItem>
                <MenuItem value='nonresident'>Non-Resident</MenuItem>
              </Select>
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
                    label='Visa Type'
                    onChange={handleVisaTypeChange}
                  >
                    <MenuItem value='H1-B'>H1-B</MenuItem>
                    <MenuItem value='L2'>L2</MenuItem>
                    <MenuItem value='F1-CPT'>F1-CPT</MenuItem>
                    <MenuItem value='F1-OPT'>F1-OPT</MenuItem>
                    <MenuItem value='H4'>H4</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='Start Date'
                  value={localData.employment.startDate || ''}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      employment: {
                        ...localData.employment,
                        startDate: e.target.value
                      }
                    })
                  }
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  type='date'
                  label='End Date'
                  value={localData.employment.endDate || ''}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      employment: {
                        ...localData.employment,
                        endDate: e.target.value
                      }
                    })
                  }
                />
              </Grid2>
            </>
          )}
        </Grid2>
      </EditableSection>
      {/* EMERGENCY CONTACT */}
      <EditableSection
        title='Emergency Contacts'
        onSave={handleEmergencyContactSave}
        onCancel={() => setLocalData(personalInfo)}
      >
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
              {/* TODO: not saving delete changes correctly */}
              <IconButton
                color='error'
                onClick={() => {
                  // NOTE: do we want custom stylings (i.e. using mui) for these
                  // pop up windows?
                  if (
                    window.confirm(
                      'Are you sure you want to delete this emergency contact?'
                    )
                  ) {
                    const updatedContacts = localData.emergencyContacts.filter(
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
            </Box>
            <Grid2 container spacing={2}>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='First Name'
                  value={contact.firstName}
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
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Last Name'
                  value={contact.lastName}
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
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label='Middle Name'
                  value={contact.middleName || ''}
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
                />
              </Grid2>
              <Grid2 size={5}>
                <TextField
                  fullWidth
                  label='Email'
                  value={contact.email}
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
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  fullWidth
                  label='Relationship'
                  value={contact.relationship}
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
      </EditableSection>
      {/* DOCUMENTS */}
      <EditableSection
        title='Documents'
        onSave={handleEmploymentSave}
        onCancel={() => setLocalData(personalInfo)}
      ></EditableSection>
    </Box>
  );
};

export default PersonalInfoPage;
