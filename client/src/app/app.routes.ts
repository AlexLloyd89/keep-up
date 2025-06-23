import { Routes } from '@angular/router';
import { LandingContainer } from './pages/landing/landing.container';
import { AdminContainer } from './pages/admin/admin.container';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    title:'Keep Up',
    component: LandingContainer,
  },
  {
    path: 'admin',
    component: AdminContainer,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
