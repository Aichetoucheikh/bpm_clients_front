import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // CORRECTION : L'URL doit pointer vers le bon endpoint du backend
  private apiUrl = 'http://localhost:8080/api/dashboard/data'; 

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

