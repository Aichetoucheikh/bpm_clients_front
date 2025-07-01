import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { EmployeListComponent } from './pages/employe-list/employe-list.component';
import { EmployeDetailComponent } from './pages/employe-detail/employe-detail.component';
import { EmployeFormComponent } from './pages/employe-form/employe-form.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';

import { AuthGuard } from './configs/auth-guard';
import { PermissionGuard } from './configs/guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'clients/:id', component: ClientDetailComponent, canActivate: [AuthGuard] },

  // Routes protégées par permissions
  {
    path: 'employes',
    component: EmployeListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'MANAGE_EMPLOYES' }
  },
  {
    path: 'employes/new',
    component: EmployeFormComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'MANAGE_EMPLOYES' }
  },
  {
    path: 'employes/:id',
    component: EmployeDetailComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'MANAGE_EMPLOYES' }
  },
  {
    path: 'management/roles',
    component: RoleManagementComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'MANAGE_ROLES_PERMISSIONS' }
  },

  { path: '**', redirectTo: 'home' }
];