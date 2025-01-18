import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectAuthState = createSelector(
  selectAuthFeature,
  (state: AuthState) => state
);

export const selectIsLoggedIn = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoggedIn
);

export const selectUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.user
);

export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.error
);

export const selectAuthToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.token
);