import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Récupère la permission requise depuis la configuration de la route
    const requiredPermission = route.data['permission'];

    // S'il n'y a pas de permission requise, on laisse passer
    if (!requiredPermission) {
      return true;
    }

    // Vérifie si l'utilisateur est connecté et a la permission
    if (this.authService.isLoggedIn() && this.authService.hasPermission(requiredPermission)) {
      return true;
    }

    // Sinon, redirection
    this.router.navigate(['/home']);
    return false;
  }
}