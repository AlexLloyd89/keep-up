import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-container',
  imports: [AdminComponent],
  template: `<app-admin (googleEmitter)="handleGoogle()"></app-admin>`,
})
export class AdminContainer {
  constructor(private router: Router, private authSvc: AuthService) {}

  handleGoogle() {
    this.authSvc.signInWithGoolge().subscribe({
      next: (userCredential) => console.log('Logged in!', userCredential),
      error: (err) => console.error('Login failed', err),
    });
  }
}
