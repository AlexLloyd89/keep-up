import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../state/auth.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-container',
  imports: [LandingComponent],
  template: `<app-landing
    [form]="form"
    (googleEmitter)="handleGoogle()"
    (loginEmitter)="handleLogin()"
    (signupEmitter)="handleSignup()"
  ></app-landing>`,
})
export class LandingContainer {
  store = inject(Store);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private authSvc: AuthService) {}

  handleGoogle() {
    this.store.dispatch(AuthActions.loginWithGoogle());
  }

  handleSignup() {
    if (this.form.invalid) return;
    const { password, email } = this.form.value;
    this.authSvc.signUp(email as string, password as string);
  }

  handleLogin() {
    if (this.form.invalid) return;
    const { password, email } = this.form.value;
    this.store.dispatch(AuthActions.login({ password, email } as any));
  }
}
