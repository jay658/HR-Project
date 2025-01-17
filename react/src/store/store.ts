import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import onboardingReducer from "./onboardingSlice/onboardingSlice";
import housingReducer from "./housingSlice/housingSlice";
import authReducer from "./authSlice/authSlice";
import facilityIssuesReducer from './facilityIssuesSlice/facilityIssuesSlice.ts';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboarding: onboardingReducer,
    housing: housingReducer,
    auth: authReducer,
    facilityIssues: facilityIssuesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
