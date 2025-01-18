import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    isLoggedIn: true,
    user,
    token,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...initialAuthState,
  })),
  on(AuthActions.loadUserFromStorage, (state) => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (storedUser && storedToken && storedIsLoggedIn === 'true') {
      try {
        return {
          ...state,
          isLoggedIn: true,
          user: JSON.parse(storedUser),
          token: storedToken,
          loading: false,
        };
      } catch {
        return initialAuthState;
      }
    }
    return initialAuthState;
  })
);
