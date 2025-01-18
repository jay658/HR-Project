import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    isLoggedIn: true,
    user,
    token,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(AuthActions.logout, state => ({
    ...state,
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: null
  })),
  on(AuthActions.loadUserFromStorage, state => {
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
          loading: false
        };
      } catch {
        return initialState;
      }
    }
    return initialState;
  })
);
