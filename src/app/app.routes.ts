import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AuthGuard } from './configs/auth-guard'; // Assurez-vous que ce fichier existe
import { AdminGuard } from './configs/guards/admin.guard'; // CORRECTION : chemin d'import
import { EmployeListComponent } from './pages/employe-list/employe-list.component'; // Assurez-vous d'importer ce composant
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { EmployeDetailComponent } from './pages/employe-detail/employe-detail.component'; // NOUVEAU

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'clients/:id', component: ClientDetailComponent, canActivate: [AuthGuard] }, // NOUVELLE ROUTE
 
  
  // NOUVELLE ROUTE PROTÉGÉE POUR LES EMPLOYÉS
  { 
    path: 'employes', 
    component: EmployeListComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'employes/:id', 
    component: EmployeDetailComponent, 
    canActivate: [AuthGuard, AdminGuard] 
  },
  { path: '**', redirectTo: 'home' }
  
];
