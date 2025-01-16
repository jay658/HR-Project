import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice/counterSlice'
import onboardingReducer from './onboardingSlice/onboardingSlice'
import visaReducer from './visaSlice/visaSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboarding: onboardingReducer,
    visa: visaReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
