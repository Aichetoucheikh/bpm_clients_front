import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employe } from '../../models/employe';
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-employe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employe-detail.component.html',
  styleUrls: ['./employe-detail.component.css']
})
export class EmployeDetailComponent implements OnInit {
  employe: Employe | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeService: EmployeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const employeId = this.route.snapshot.paramMap.get('id');
    if (employeId) {
      this.employeService.getEmployeById(+employeId).subscribe(data => {
        this.employe = data;
      });
    }
  }

  toggleStatut(): void {
    if (!this.employe || !this.employe.id) return;
    const action = this.employe.status === 'ACTIF' 
      ? this.employeService.suspendreEmploye(this.employe.id)
      : this.employeService.reactiverEmploye(this.employe.id);

    action.subscribe(updatedEmploye => {
      this.employe = updatedEmploye;
      alert(`Statut de l'employé mis à jour : ${updatedEmploye.status}`);
    });
  }

  onDelete(): void {
    if (!this.employe || !this.employe.id) return;
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'employé "${this.employe.nom}" ?`)) {
      this.employeService.deleteEmploye(this.employe.id).subscribe(() => {
        alert('Employé supprimé avec succès.');
        this.router.navigate(['/employes']);
      });
    }
  }
}