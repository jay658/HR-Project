import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((response) => {
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/home']); // or whatever your home route is

            // Remove the forced navigation to dashboard/onboarding
            // Let the component handle navigation if needed

            return AuthActions.loginSuccess({
              user: response.user,
              token: response.token,
            });
          }),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: error.message || 'An error occurred during login',
              })
            )
          )
        )
      )
    )
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('isLoggedIn');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
