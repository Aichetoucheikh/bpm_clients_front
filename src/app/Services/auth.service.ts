import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { loginEndpoint } from '../configs/endpoints';

@Injectable({
  providedIn: 'root'
})
// Le nom de la classe est maintenant AuthService, ce qui est standard.
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userRole = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  private userName = new BehaviorSubject<string | null>(localStorage.getItem('userName'));

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(loginEndpoint, { identifiantConnexion: username, motDePasse: password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('userRole', response.role);
            localStorage.setItem('userName', response.nom);
            
            this.loggedIn.next(true);
            this.userRole.next(response.role);
            this.userName.next(response.nom);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    
    this.loggedIn.next(false);
    this.userRole.next(null);
    this.userName.next(null);

    this.router.navigate(['/login']);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  // --- Observables pour les composants ---
  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public getUserRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  public getUserName(): Observable<string | null> {
    return this.userName.asObservable();
  }
  
  // --- Méthodes synchrones pour les Guards ---
  public isLoggedInSync(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
  
  public getRoleSync(): string | null {
    return localStorage.getItem('userRole');
  }
}