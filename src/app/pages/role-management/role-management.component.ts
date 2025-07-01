import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeService } from '../../services/employe.service';
import { Role, Permission } from '../../models/employe';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  // Données
  allRoles: Role[] = [];
  allPermissions: Permission[] = [];

  // État de l'interface
  newRoleName: string = '';
  selectedRole: Role | null = null;
  selectedPermissionIds: Set<number> = new Set();

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles(): void {
    this.employeService.getAllRoles().subscribe(data => this.allRoles = data);
  }

  loadPermissions(): void {
    this.employeService.getAllPermissions().subscribe(data => this.allPermissions = data);
  }

  createRole(): void {
    if (!this.newRoleName.trim()) return;
    this.employeService.createRole(this.newRoleName).subscribe({
      next: (newRole) => {
        this.allRoles.push(newRole);
        this.newRoleName = '';
        alert('Rôle créé avec succès !');
      },
      error: (err) => alert(err.error?.message || 'Erreur lors de la création du rôle.')
    });
  }

  selectRole(role: Role): void {
    this.selectedRole = role;
    // Initialiser les permissions sélectionnées
    this.selectedPermissionIds = new Set(role.permissions.map(p => p.id));
  }

  onPermissionChange(permissionId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedPermissionIds.add(permissionId);
    } else {
      this.selectedPermissionIds.delete(permissionId);
    }
  }

  savePermissionsForRole(): void {
    if (!this.selectedRole) return;

    const permissionIdsArray = Array.from(this.selectedPermissionIds);

    this.employeService.assignPermissionsToRole(this.selectedRole.id, permissionIdsArray).subscribe({
      next: (updatedRole) => {
        // Mettre à jour la liste locale
        const index = this.allRoles.findIndex(r => r.id === updatedRole.id);
        if (index !== -1) {
          this.allRoles[index] = updatedRole;
        }
        alert(`Permissions pour le rôle "${updatedRole.name}" mises à jour.`);
      },
      error: () => alert('Erreur lors de la mise à jour des permissions.')
    });
  }

}