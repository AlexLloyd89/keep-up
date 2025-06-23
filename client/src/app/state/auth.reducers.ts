import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from '../app.models';
import { AuthActions } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginWithGoogleSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(AuthActions.logoutSuccess, () => initialAuthState)
);
