import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';



export const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin', component: AdminLayoutComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'admin-login' },
  { path: '**', redirectTo: 'admin-login' }
];
