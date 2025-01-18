<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice/counterSlice'
import onboardingReducer from './onboardingSlice/onboardingSlice'
import visaReducer from './visaSlice/visaSlice'
=======
import authReducer from "./authSlice/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import facilityIssuesReducer from './facilityIssuesSlice/facilityIssuesSlice.ts';
import housingReducer from "./housingSlice/housingSlice";
import onboardingReducer from "./onboardingSlice/onboardingSlice";
import registrationReducer from './registrationSlice/registrationSlice'
>>>>>>> main

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboarding: onboardingReducer,
<<<<<<< HEAD
    visa: visaReducer
=======
    housing: housingReducer,
    auth: authReducer,
    facilityIssues: facilityIssuesReducer,
    registration: registrationReducer
>>>>>>> main
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
