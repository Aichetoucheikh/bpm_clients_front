
import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Employe, Role, EmployeStatus } from '../../models/employe'; 
import { EmployeService } from '../../services/employe.service';

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.css']
})
export class EmployeFormComponent implements OnInit { 
  
  // Modèle pour le formulaire
  newEmploye: {
    nom: string;
    identifiantConnexion: string;
    motDePasse: string;
    photoUrl?: string;
    roleIds: number[]; // On va lier les IDs des rôles sélectionnés
  } = { 
    nom: '', 
    identifiantConnexion: '', 
    motDePasse: '',
    roleIds: []
  };
  
  // Liste des rôles disponibles, chargée depuis le backend
  availableRoles: Role[] = [];
  errorMessage: string | null = null;

  constructor(
    private employeService: EmployeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Charger tous les rôles disponibles au démarrage du composant
    this.employeService.getAllRoles().subscribe(roles => {
      this.availableRoles = roles;
    });
  }

  // Gérer le changement d'une case à cocher
  onRoleChange(roleId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.newEmploye.roleIds.push(roleId);
    } else {
      const index = this.newEmploye.roleIds.indexOf(roleId);
      if (index > -1) {
        this.newEmploye.roleIds.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    
    // On prépare l'objet Employe final à envoyer
    const employeToCreate = {
      nom: this.newEmploye.nom,
      identifiantConnexion: this.newEmploye.identifiantConnexion,
      motDePasse: this.newEmploye.motDePasse,
      photoUrl: this.newEmploye.photoUrl,
      status: EmployeStatus.ACTIF,
      // On attache les objets Role complets, pas juste les IDs
      roles: this.newEmploye.roleIds.map(id => this.availableRoles.find(r => r.id === id)!)
    };

    this.employeService.createEmploye(employeToCreate).subscribe({
      next: () => {
        alert('Employé créé avec succès !');
        this.router.navigate(['/employes']);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || "Une erreur est survenue lors de la création.";
        console.error(err);
      }
    });
  }
}