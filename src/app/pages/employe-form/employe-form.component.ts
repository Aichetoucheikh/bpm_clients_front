import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeService } from '../../services/employe.service';
import { Employe, EmployeStatus, Role } from '../../models/employe';

@Component({
  selector: 'app-employe-form',
  standalone: true, // <-- CORRECTION : Il manquait cette ligne
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.css']
})export class EmployeFormComponent implements OnInit {
  
  // --- CORRECTION : Initialiser l'objet avec TOUS les champs requis ---
  employe: Employe = {
    nom: '',
    identifiantConnexion: '',
    role: Role.AGENT_BANKILY,
    motDePasse: '',
    status: EmployeStatus.ACTIF // Le champ 'status' était manquant
  };
  isEditMode = false;
  roles = Object.values(Role);

  constructor(
    private employeService: EmployeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeService.getEmployeById(+id).subscribe(data => {
        this.employe = data;
        this.employe.motDePasse = '';
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.employeService.updateEmploye(this.employe.id!, this.employe).subscribe(() => {
        this.router.navigate(['/employes']);
      });
    } else {
      this.employeService.createEmploye(this.employe).subscribe(() => {
        this.router.navigate(['/employes']);
      });
    }
  }
}
