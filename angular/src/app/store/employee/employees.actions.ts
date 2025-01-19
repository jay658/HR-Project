import { createAction, props } from '@ngrx/store';

export interface Employee {
  _id: string;
  email: string;
  personInfoId: {
    name: {
      firstName: string;
      lastName: string;
      preferredName?: string;
    };
    SSN: string;
    phone: string;
    employement: {
      visaTitle: string;
    };
  };
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
