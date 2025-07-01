import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { loginEndpoint } from '../configs/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userNameSubject = new BehaviorSubject<string | null>(null);
  private userPhotoUrlSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(loginEndpoint, credentials).pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('userName', response.nom);
        localStorage.setItem('userRoles', JSON.stringify(response.roles)); // Stockage en tableau JSON
        localStorage.setItem('userPermissions', JSON.stringify(response.permissions)); // Nouveau : stocker les permissions
        localStorage.setItem('userPhotoUrl', response.photoUrl);

        this.userNameSubject.next(response.nom);
        this.userPhotoUrlSubject.next(response.photoUrl);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.userNameSubject.next(null);
    this.userPhotoUrlSubject.next(null);
    this.router.navigate(['/login']);
  }

  public getRoles(): string[] {
    const rolesString = localStorage.getItem('userRoles');
    return rolesString ? JSON.parse(rolesString) : [];
  }

  public hasRole(roleName: string): boolean {
    return this.getRoles().includes(roleName);
  }

  public getPermissions(): string[] {
    const permissionsString = localStorage.getItem('userPermissions');
    return permissionsString ? JSON.parse(permissionsString) : [];
  }

  public hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  private loadUserFromStorage(): void {
    this.userNameSubject.next(localStorage.getItem('userName'));
    this.userPhotoUrlSubject.next(localStorage.getItem('userPhotoUrl'));
  }

  getUserName(): Observable<string | null> {
    return this.userNameSubject.asObservable();
  }

  getUserPhotoUrl(): Observable<string | null> {
    return this.userPhotoUrlSubject.asObservable();
  }
}