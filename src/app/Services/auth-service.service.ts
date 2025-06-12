import { Injectable } from '@angular/core';
import { loginEndpoint } from '../configs/endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${loginEndpoint}`, {identifiantConnexion: username, motDePasse: password});
  }
}
