import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
  loadEmployeeDetails,
  loadEmployeeDetailsSuccess,
  loadEmployeeDetailsFailure,
} from './employees.actions';

import { EmployeesService } from './employees.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEffects {
  loadEmployees$ = createEffect(() =>
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
          catchError((error) => {
            if (error.status === 403) {
              return of(
                loadEmployeesFailure({
                  error: 'Please log in to view employee data',
                })
              );
            }
            return of(
              loadEmployeesFailure({
                error: 'Failed to load employees',
              })
            );
          })
        )
      )
    )
  );

  loadEmployeeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployeeDetails),
      mergeMap(({ id }) =>
        this.employeesService.getEmployeeDetails(id).pipe(
          map(response => loadEmployeeDetailsSuccess({ employee: response.data })),
          catchError(error => of(loadEmployeeDetailsFailure({ error: 'Failed to load employee details' })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService
  ) {}
}
