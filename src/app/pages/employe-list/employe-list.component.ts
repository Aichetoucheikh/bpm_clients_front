import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Employe } from '../../models/employe';
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
  termeRecherche: string = '';

  constructor(private employeService: EmployeService, private router: Router) { }

  ngOnInit(): void {
    this.rechercher();
  }

  rechercher(): void {
    this.employeService.rechercherEmployes(this.termeRecherche).subscribe(data => {
      this.employes = data;
    });
  }

  voirDetails(employe: Employe): void {
    this.router.navigate(['/employes', employe.id]);
  }
}

