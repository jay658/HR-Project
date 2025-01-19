import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EmployeeState } from './employees.reducers';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('Employees');

export const selectEmployees = createSelector(
  selectEmployeeState,
  (state) => state.employees
);

export const selectTotalCount = createSelector(
  selectEmployeeState,
  (state) => state.totalCount
);

export const selectLoading = createSelector(
  selectEmployeeState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectEmployeeState,
  (state) => state.error
);
