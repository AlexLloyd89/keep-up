import { User } from '@angular/fire/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserModel } from '../app.models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: any }>(),
    'Login With Google': emptyProps(),
    'Login With Google Success': props<{ user: UserModel }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Faiulure': props<{ error: any }>(),
  },
});
