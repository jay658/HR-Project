import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
} from './employees.actions';

import { EmployeesService } from './employees.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEffects {
  loadEmployees = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      mergeMap(({ searchParams }) =>
        this.employeesService.getEmployees(searchParams).pipe(
          map((response) =>
            loadEmployeesSuccess({
              employees: response.employees,
              totalCount: response.totalCount,
            })
          ),
          catchError((error) =>
            of(
              loadEmployeesFailure({
                error: error.message || 'Failed to load employees',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService
  ) {}
}
