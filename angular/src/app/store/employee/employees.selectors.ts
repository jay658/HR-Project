import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EmployeeState } from './employees.reducers';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employee');

export const selectEmployees = createSelector(
  selectEmployeeState,
  (state) => [...state.employees].sort((a, b) => 
    a.name.lastName.localeCompare(b.name.lastName)
  )
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

export const selectEmployeeDetails = createSelector(
  selectEmployeeState,
  (state) => state.selectedEmployee
);
