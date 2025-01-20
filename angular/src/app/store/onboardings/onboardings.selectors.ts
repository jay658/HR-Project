import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OnboardingState } from './onboardings.reducers';

export const selectOnboardingState = createFeatureSelector<OnboardingState>('onboardings');

export const selectAllOnboardings = createSelector(selectOnboardingState, (state) => state.onboardings);
export const selectLoading = createSelector(selectOnboardingState, (state) => state.loading);
export const selectError = createSelector(selectOnboardingState, (state) => state.error);

export const selectOnboardingsByStatus = createSelector(selectOnboardingState, (state) => ({
  pending: state.onboardings.filter(onboarding => onboarding.status === 'pending'),
  approved: state.onboardings.filter(onboarding => onboarding.status === 'approved'),
  rejected: state.onboardings.filter(onboarding => onboarding.status === 'rejected')
}))

export const selectPendingOnboardings = createSelector(selectOnboardingState, (state) => state.onboardings.filter(onboarding => onboarding.status === 'pending'))

export const selectApprovedOnboardings = createSelector(selectOnboardingState, (state) => state.onboardings.filter(onboarding => onboarding.status === 'approved'))

export const selectRejectedOnboardings = createSelector(selectOnboardingState, (state) => state.onboardings.filter(onboarding => onboarding.status === 'rejected'))

export const selectOnboardingById = (id: string) => createSelector(selectOnboardingState, (state) => state.onboardings.find(onboarding => onboarding._id === id))