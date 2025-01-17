import { AppDispatch, RootState } from '../store/store';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { Onboarding } from '../store/onboardingSlice/onboardingSlice';
import { US_STATES } from './shared/constants';
import { ValidationErrors } from '../utils/personalInfoValidation';
import { updateOnboarding } from '../store/onboardingSlice/onboardingThunks';

const OnboardingPage: React.FC = () => {
  const onboarding = useSelector((state: RootState) => state.onboarding);
  const dispatch = useDispatch<AppDispatch>();

  const [localData, setLocalData] = useState<Onboarding>(onboarding);
  const [errors, setErrors] = useState<OnboardingValidationErrors>({});

  useEffect(() => {
    setLocalData(onboarding);
  }, [onboarding]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value
    });
  };

  // need to unflatten the data
  const handleSave = () => {
    dispatch(updateOnboarding(localData));
  };

  console.log('localData: ', localData);
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 5 }}>
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
            <Button variant='contained' component='label' size='small'>
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
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              // error={Boolean(errors.name?.firstName)}
              // helperText={errors.name?.firstName}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='lastName'
              label='Last Name'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              // error={Boolean(errors.name?.lastName)}
              // helperText={errors.name?.lastName}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='middleName'
              label='Middle Name'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='preferredName'
              label='Preferred Name'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField fullWidth name='email' label='Email' disabled={true} />
          </Grid2>

          <Grid2 size={6}>
            <TextField
              fullWidth
              name='ssn'
              label='SSN'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              // error={Boolean(errors.SSN)}
              // helperText={errors.SSN}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name='dob'
              type='date'
              value={localData.dob}
              label='Birthday'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
              // error={Boolean(errors.dob)}
              // helperText={errors.dob}
            />
          </Grid2>
          <FormControl>
            <InputLabel id='gender-select-label'>Gender</InputLabel>
            <Select
              labelId='gender-select-label'
              id='gender-select'
              name='gender'
              // value={localData.gender}
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
              name='streetName'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name='buildingNumber'
              label='Building/Apartment #'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              name='city'
              label='City'
              onChange={
                handleChange as React.ChangeEventHandler<HTMLInputElement>
              }
            />
          </Grid2>
          <Grid2 size={2}>
            <FormControl fullWidth>
              <InputLabel id='state-select-label'>State</InputLabel>
              <Select
                labelId='state-select-label'
                id='state-select'
                value={localData.state}
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
              name='zipCode'
              label='Zip Code'
              onChange={handleChange as React.ChangeEventHandler}
            />
          </Grid2>
        </Grid2>
      </Box>
      {/* <Typography variant='h4' gutterBottom>
        Onboarding Application
      </Typography>
      <Typography variant='body1' gutterBottom>
        Welcome to the onboarding process! Please complete the required steps
        and submit your application.
      </Typography>
      <Button variant='contained' color='primary' sx={{ mt: 2 }}>
        Start Application
      </Button>
      <Button
        variant='contained'
        color='primary'
        sx={{ mt: 2 }}
        onClick={() => handleUpdateOnboarding()}
      >
        Update Application
      </Button> */}
    </Box>
  );
};

export default OnboardingPage;
