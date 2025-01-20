import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './users.reducers';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, (state) => state.users);
export const selectUsersWithOnboarding = createSelector(selectUserState, (state) => state.users.filter(user => user.onboardingId !== null))
export const selectLoading = createSelector(selectUserState, (state) => state.loading);
export const selectError = createSelector(selectUserState, (state) => state.error);
