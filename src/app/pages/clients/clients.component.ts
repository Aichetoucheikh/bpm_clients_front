import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientComponent } from "../client/client.component"; // Ajustez le chemin si nécessaire
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';
import { FormsModule } from '@angular/forms';  // Pour ngModel dans la recherche
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ClientComponent,
    MatIconModule,
    FormsModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']  // Correction ici
})
export class ClientsComponent implements OnInit{
resetSearch() {
throw new Error('Method not implemented.');
}

  clients: Client[] = [];

  currentPage: number = 0;
  totalPages: number = 0;

  searchPhone: string = '';

  constructor (private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(page = 0, size = 10) {
    this.clientsService.getAllClients(page, size)
      .subscribe({
        next: (response) => {
          this.clients = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = response.number;
        },
        error: (err) => {
          console.error('Error loading clients:', err);
        }
      });
  }

  // Nouvelle méthode pour chercher par téléphone
  searchClients(): void {
    if (!this.searchPhone.trim()) {
      this.getClients();
      return;
    }
    this.clientsService.searchClientsByPhone(this.searchPhone, 0, 10)
      .subscribe({
        next: (response) => {
          this.clients = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = response.number;
        },
        error: (err) => {
          console.error('Erreur lors de la recherche :', err);
        }
      });
  }

  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;

    // Si on a un texte dans la recherche, on refait une recherche avec la nouvelle page
    if (this.searchPhone.trim()) {
      this.clientsService.searchClientsByPhone(this.searchPhone, page, 10)
        .subscribe({
          next: (response) => {
            this.clients = response.content;
            this.totalPages = response.totalPages;
            this.currentPage = response.number;
          },
          error: (err) => {
            console.error('Erreur lors du changement de page :', err);
          }
        });
    } else {
      this.getClients(page);
    }
  }
}