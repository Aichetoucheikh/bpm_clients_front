import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // CORRECTION : Le chemin est maintenant correct

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInSync() && this.authService.getRoleSync() === 'ADMIN') {
      return true;
    }
    
    this.router.navigate(['/home']);
    return false;
  }
}