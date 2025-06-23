// src/app/Services/employe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/employe';
import { employesEndpoint } from '../configs/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = employesEndpoint; // Utiliser l'endpoint depuis le fichier de config

  constructor(private http: HttpClient) { }

  getAllEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

  // --- MÉTHODE MANQUANTE 1 (pour la ligne 34) ---
  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/${id}`);
  }

  createEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(this.apiUrl, employe);
  }

  // --- MÉTHODE MANQUANTE 2 (pour la ligne 43) ---
  updateEmploye(id: number, employe: Employe): Observable<Employe> {
    // On envoie l'objet employé complet, le backend gérera la logique
    return this.http.put<Employe>(`${this.apiUrl}/${id}`, employe);
  }

  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // --- NOUVELLES MÉTHODES ---
  suspendreEmploye(id: number): Observable<Employe> {
    return this.http.post<Employe>(`${this.apiUrl}/${id}/suspend`, {});
  }
  
  reactiverEmploye(id: number): Observable<Employe> {
    return this.http.post<Employe>(`${this.apiUrl}/${id}/reactivate`, {});
  }
  

rechercherEmployes(terme: string): Observable<Employe[]> {
  // Si le terme est vide, on appelle l'endpoint sans paramètre pour tout récupérer
  const endpoint = terme ? `${this.apiUrl}?recherche=${terme}` : this.apiUrl;
  return this.http.get<Employe[]>(endpoint);
}


}
