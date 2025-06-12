import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientComponent } from "../client/client.component"; // Ajustez le chemin si nécessaire
import { Client } from '../../models/client';
import { ClientsService } from '../../Services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ClientComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

  clients: Client[] = [];

  currentPage: number = 0;
  totalPages: number = 0;

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

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.getClients(page);
    }
  }

}