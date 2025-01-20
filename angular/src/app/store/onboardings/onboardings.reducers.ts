import { createReducer, on } from '@ngrx/store';
import { loadOnboardings, loadOnboardingsFailure, loadOnboardingsSuccess, updateOnboardingStatus, updateOnboardingStatusFailure, updateOnboardingStatusSuccess } from './onboardings.actions';

import type { Onboarding } from 'src/app/interfaces/Types';

export interface OnboardingState {
  onboardings: Onboarding[];
  loading: boolean;
  error: any;
}

export const initialState: OnboardingState = {
  onboardings: [],
  loading: false,
  error: null,
};

export const onboardingReducer = createReducer(
  initialState,
  on(loadOnboardings, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadOnboardingsSuccess, (state, { onboardings }) => ({
    ...state,
    loading: false,
    onboardings,
  })),
  on(loadOnboardingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateOnboardingStatus, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateOnboardingStatusSuccess, (state, { updatedOnboarding }) => ({
    ...state,
    loading: false,
    onboardings: state.onboardings.map(item => 
      item._id === updatedOnboarding._id ? {...item, status: updatedOnboarding.status} : item
    ),
  })),
  on(updateOnboardingStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);