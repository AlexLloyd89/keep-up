import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthActions } from './auth.actions';
import { catchError, exhaustMap, from, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authSvc = inject(AuthService);
  router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authSvc.signIn(email, password).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginWithGoogle),
      exhaustMap(() =>
        from(this.authSvc.signInWithGoolge()).pipe(
          map((user) => AuthActions.loginWithGoogleSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authSvc.signOut().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFaiulure({ error })))
        )
      )
    )
  );

  redirectOnLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/admin']))
      ),
    { dispatch: false }
  );
}
