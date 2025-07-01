import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe, Role, Permission } from '../models/employe';
import { employesEndpoint, managementEndpoint } from '../configs/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  rechercherEmployes(terme: string): Observable<Employe[]> {
    const endpoint = terme ? `${employesEndpoint}?recherche=${terme}` : employesEndpoint;
    return this.http.get<Employe[]>(endpoint);
  }

  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${employesEndpoint}/${id}`);
  }

  createEmploye(employe: any): Observable<Employe> {
    return this.http.post<Employe>(employesEndpoint, employe);
  }

  suspendreEmploye(id: number): Observable<Employe> {
    return this.http.post<Employe>(`${employesEndpoint}/${id}/suspend`, {});
  }

  reactiverEmploye(id: number): Observable<Employe> {
    return this.http.post<Employe>(`${employesEndpoint}/${id}/reactivate`, {});
  }

  deleteEmploye(id: number): Observable<void> {
    return this.http.delete<void>(`${employesEndpoint}/${id}`);
  }

  // --- GESTION DES RÔLES ET PERMISSIONS ---

  assignRolesToEmploye(employeId: number, roleIds: number[]): Observable<Employe> {
    return this.http.put<Employe>(`${employesEndpoint}/${employeId}/roles`, roleIds);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${managementEndpoint}/roles`);
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${managementEndpoint}/permissions`);
  }

  // --- NOUVELLE MÉTHODE POUR CRÉER UN RÔLE ---
  createRole(name: string): Observable<Role> {
    return this.http.post<Role>(`${managementEndpoint}/roles`, { name });
  }

  // --- NOUVELLE MÉTHODE POUR ASSIGNER LES PERMISSIONS A UN RÔLE ---
  assignPermissionsToRole(roleId: number, permissionIds: number[]): Observable<Role> {
    return this.http.post<Role>(`${managementEndpoint}/roles/${roleId}/permissions`, permissionIds);
  }
}