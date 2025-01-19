import {
  Employee,
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
} from './employees.actions';
import { createReducer, on } from '@ngrx/store';

export interface EmployeeState {
  employees: Employee[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

export const initialState: EmployeeState = {
  employees: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const employeeReducer = createReducer(
  initialState,
  on(loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadEmployeesSuccess, (state, { employees, totalCount }) => ({
    ...state,
    loading: false,
    employees,
    totalCount,
  })),
  on(loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
