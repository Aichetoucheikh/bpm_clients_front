import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; // Assurez-vous que le chemin est correct
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AuthGuard } from './configs/auth-guard';

export const routes: Routes = [
 
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'home' } // Ou vers une page NotFoundComponent
];