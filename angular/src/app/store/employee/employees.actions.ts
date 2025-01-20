import { createAction, props } from '@ngrx/store';

export interface Employee {
  id: string;
  name: {
    firstName: string;
    lastName: string;
    preferredName?: string;
    fullName: string;
  };
  ssn: string;
  workAuthorizationTitle: string;
  visaType?: string | null;
  otherVisaTitle?: string | null;
  phoneNumber: string;
  email: string;
}

export interface EmployeeResponse {
  success: boolean;
  totalCount: number;
  filteredCount: number;
  data: Employee[];
}

export const loadEmployees = createAction(
  '[Employees] Load Employees',
  props<{
    searchParams?: {
      firstName?: string;
      lastName?: string;
      preferredName?: string;
    };
  }>()
);

export const loadEmployeesSuccess = createAction(
  '[Employees] Load Employees Success',
  props<{ employees: Employee[]; totalCount: number }>()
);

export const loadEmployeesFailure = createAction(
  '[Employees] Load Employees Failure',
  props<{ error: string }>()
);

export const loadEmployeeDetails = createAction(
  '[Employees] Load Employee Details',
  props<{ id: string }>()
);

export const loadEmployeeDetailsSuccess = createAction(
  '[Employees] Load Employee Details Success',
  props<{ employee: any }>()
);

export const loadEmployeeDetailsFailure = createAction(
  '[Employees] Load Employee Details Failure',
  props<{ error: string }>()
);
