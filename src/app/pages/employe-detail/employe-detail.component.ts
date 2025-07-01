import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employe, Role } from '../../models/employe';
import { EmployeService } from '../../services/employe.service';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-employe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employe-detail.component.html',
  styleUrls: ['./employe-detail.component.css']
})
export class EmployeDetailComponent implements OnInit {
  employe: Employe | null = null;
  availableRoles: Role[] = [];
  selectedRoleIds: Set<number> = new Set();
  canManageRoles: boolean = false; // Nouvelle propriété

  constructor(
    private route: ActivatedRoute,
    private employeService: EmployeService,
    private authService: AuthService, // Service ajouté
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllRoles();
    const employeId = this.route.snapshot.paramMap.get('id');
    
    // Vérification de la permission
    this.canManageRoles = this.authService.hasPermission('MANAGE_ROLES_PERMISSIONS');
    
    if (employeId) {
      this.loadEmploye(+employeId);
    }
  }

  loadEmploye(id: number): void {
    this.employeService.getEmployeById(id).subscribe(data => {
      this.employe = data;
      this.selectedRoleIds = new Set(data.roles.map(r => r.id));
    });
  }
  
  loadAllRoles(): void {
      this.employeService.getAllRoles().subscribe(roles => {
          this.availableRoles = roles;
      });
  }
  
  isRoleSelected(roleId: number): boolean {
      return this.selectedRoleIds.has(roleId);
  }

  onRoleChange(roleId: number, event: Event): void {
    // Bloque les modifications sans permission
    if (!this.canManageRoles) return;
    
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedRoleIds.add(roleId);
    } else {
      this.selectedRoleIds.delete(roleId);
    }
  }

  onUpdateRoles(): void {
    // Double vérification de sécurité
    if (!this.employe || !this.canManageRoles) return;
    
    const roleIdsArray = Array.from(this.selectedRoleIds);
    this.employeService.assignRolesToEmploye(this.employe.id!, roleIdsArray).subscribe({
      next: (updatedEmploye) => {
        this.employe = updatedEmploye;
        alert('Les rôles ont été mis à jour avec succès.');
      },
      error: (err) => alert('Erreur lors de la mise à jour des rôles.')
    });
  }

  toggleStatut(): void {
    if (!this.employe) return;
    const action = this.employe.status === 'ACTIF' 
      ? this.employeService.suspendreEmploye(this.employe.id!)
      : this.employeService.reactiverEmploye(this.employe.id!);
    
    action.subscribe(updatedEmploye => this.employe = updatedEmploye);
  }

  onDelete(): void {
    if (!this.employe || !confirm(`Supprimer définitivement l'employé ${this.employe.nom} ?`)) {
        return;
    }
    this.employeService.deleteEmploye(this.employe.id!).subscribe({
        next: () => {
            alert('Employé supprimé.');
            this.router.navigate(['/employes']);
        },
        error: (err) => alert("Impossible de supprimer cet employé.")
    });
  }
}