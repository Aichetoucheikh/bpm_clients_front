import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {
  private apiUrl = 'http://localhost:8080/api/management';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  createRole(name: string): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles`, { name });
  }
  
  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/permissions`);
  }

  assignPermissionsToRole(roleId: number, permissionIds: number[]): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles/${roleId}/permissions`, permissionIds);
  }
}
