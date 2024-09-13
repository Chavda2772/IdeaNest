import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './modules/register/register.component';
import { authGuard } from './core/guard/auth.guard';
import { guestGuard } from './core/guard/guest.guard';
import { AddUpdateComponent } from './modules/add-update/add-update.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
    title: 'Register',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    title: 'Dashboard',
  },
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
    canActivate: [authGuard],
    title: 'Dashboard',
  },
  {
    path: 'add',
    component: AddUpdateComponent,
    canActivate: [authGuard],
    title: 'Add Item',
  },
  {
    path: 'add/:id',
    component: AddUpdateComponent,
    canActivate: [authGuard],
    title: 'Add Item',
  },
  {
    path: 'update/:id',
    component: AddUpdateComponent,
    canActivate: [authGuard],
    title: 'Update Item',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
  },
];
