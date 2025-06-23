import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Employe, Role, EmployeStatus } from '../../models/employe';
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];
  newEmploye: Employe = { nom: '', identifiantConnexion: '', role: Role.AGENT_BANKILY, motDePasse: '', status: EmployeStatus.ACTIF };
  roles = Object.values(Role);
  public errorMessage: string | null = null;

  constructor(private employeService: EmployeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getAllEmployes().subscribe(data => this.employes = data);
  }

  voirDetails(employe: Employe): void {
    this.router.navigate(['/employes', employe.id]);
  }

  toggleStatut(employe: Employe): void {
    const action = employe.status === 'ACTIF' 
      ? this.employeService.suspendreEmploye(employe.id!)
      : this.employeService.reactiverEmploye(employe.id!);
    const confirmationMessage = `Êtes-vous sûr de vouloir ${employe.status === 'ACTIF' ? 'suspendre' : 'réactiver'} cet employé ?`;

    if (confirm(confirmationMessage)) {
      action.subscribe(updatedEmploye => {
        const index = this.employes.findIndex(e => e.id === updatedEmploye.id);
        if (index !== -1) {
          this.employes[index] = updatedEmploye;
        }
      });
    }
  }

  onDelete(employe: Employe): void {
    if (confirm(`Supprimer l'employé "${employe.nom}" ?`)) {
      this.employeService.deleteEmploye(employe.id!).subscribe(() => this.loadEmployes());
    }
  }
  
  onSubmitNewEmploye(): void {
      this.errorMessage = null;
      this.employeService.createEmploye(this.newEmploye).subscribe({
          next: () => {
              this.loadEmployes();
              this.newEmploye = { nom: '', identifiantConnexion: '', role: Role.AGENT_BANKILY, motDePasse: '', status: EmployeStatus.ACTIF };
          },
          error: (err) => {
              this.errorMessage = err.error?.error || "Une erreur est survenue lors de la création.";
          }
      });
  }
}