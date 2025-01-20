<<<<<<< HEAD
<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import onboardingReducer from "./onboardingSlice/onboardingSlice";
import housingReducer from "./housingSlice/housingSlice";
import authReducer from "./authSlice/authSlice";
import facilityIssuesReducer from './facilityIssuesSlice/facilityIssuesSlice.ts';
import registrationReducer from './registrationSlice/registrationSlice'
=======
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice/counterSlice'
import onboardingReducer from './onboardingSlice/onboardingSlice'
import visaReducer from './visaSlice/visaSlice'
>>>>>>> SCRUM-20-create-visa-page
=======
import authReducer from './authSlice/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice/counterSlice';
import facilityIssuesReducer from './facilityIssuesSlice/facilityIssuesSlice.ts';
import housingReducer from './housingSlice/housingSlice';
import onboardingReducer from './onboardingSlice/onboardingSlice';
import personalInfoReducer from './personalInfoSlice/personalInfoSlice';
import registrationReducer from './registrationSlice/registrationSlice';
import visaReducer from './visaSlice/visaSlice'
>>>>>>> main

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboarding: onboardingReducer,
<<<<<<< HEAD
<<<<<<< HEAD
    housing: housingReducer,
    auth: authReducer,
    facilityIssues: facilityIssuesReducer,
    registration: registrationReducer
=======
    visa: visaReducer
>>>>>>> SCRUM-20-create-visa-page
=======
    visa: visaReducer,
    personalInfo: personalInfoReducer,
    housing: housingReducer,
    auth: authReducer,
    facilityIssues: facilityIssuesReducer,
    registration: registrationReducer,
>>>>>>> main
  },

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
