import { createAction, props } from '@ngrx/store'

import { Onboarding } from 'src/app/interfaces/Types';

export const loadOnboardings = createAction('[Onboarding API] Load Onboardings')
export const loadOnboardingsSuccess = createAction(
  '[Onboarding API] Load Onboardings Success',
  props<{ onboardings: Onboarding[] }>()
);
export const loadOnboardingsFailure = createAction(
  '[Onboarding API] Load Onboardings Failure',
  props<{ error: any }>()
);

export const updateOnboardingStatus = createAction(
  '[Onboarding API] Update Onboarding Status',
  props<{ status: 'approved' | 'rejected', onboardingId: string }>()
)
export const updateOnboardingStatusSuccess = createAction(
  '[Onboarding API] Update Onboarding Success',
  props<{ message: string, updatedOnboarding: Onboarding }>()
);
export const updateOnboardingStatusFailure = createAction(
  '[Onboarding API] Update Onboarding Failure',
  props<{ error: any }>()
);