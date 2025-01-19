import {
  Employee,
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
  loadEmployeeDetails,
  loadEmployeeDetailsSuccess,
  loadEmployeeDetailsFailure,
} from './employees.actions';
import { createReducer, on } from '@ngrx/store';

// state interface
export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: any;
  totalCount: number;
  loading: boolean;
  error: string | null;
}

// initial state
export const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
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
  })),
  on(loadEmployeeDetails, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadEmployeeDetailsSuccess, (state, { employee }) => ({
    ...state,
    loading: false,
    selectedEmployee: employee,
  })),
  on(loadEmployeeDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
