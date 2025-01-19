import authReducer from "./authSlice/authSlice";

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice/counterSlice'
import facilityIssuesReducer from './facilityIssuesSlice/facilityIssuesSlice.ts';
import housingReducer from "./housingSlice/housingSlice";
import onboardingReducer from './onboardingSlice/onboardingSlice'
import registrationReducer from './registrationSlice/registrationSlice'
import visaReducer from './visaSlice/visaSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboarding: onboardingReducer,
    visa: visaReducer,
    housing: housingReducer,
    auth: authReducer,
    facilityIssues: facilityIssuesReducer,
    registration: registrationReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
