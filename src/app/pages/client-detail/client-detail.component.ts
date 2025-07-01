import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client: Client | null = null;
  motifBlocage: string = '';

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.loadClient(+clientId);
    }
  }

  loadClient(id: number): void {
    this.clientsService.getClientById(id).subscribe(data => {
      this.client = data;
    });
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  block(): void {
    if (!this.client || !this.motifBlocage.trim()) return;
    
    this.clientsService.blockClient(this.client.id, this.motifBlocage)
      .subscribe({
        next: (updatedClient: Client) => {
          this.client = updatedClient;
          this.motifBlocage = '';
          alert('Client bloqué avec succès.');
        },
        error: (err) => {
          console.error("Erreur lors du blocage", err);
          alert("Une erreur est survenue.");
        }
      });
  }

  unblock(): void {
    if (!this.client) return;
    if (confirm('Êtes-vous sûr de vouloir débloquer ce client ?')) {
      this.clientsService.unblockClient(this.client.id).subscribe(updatedClient => {
        this.client = updatedClient;
        alert('Client débloqué avec succès.');
      });
    }
  }

  consultOtp(): void {
    if (!this.client) return;
    alert(`L'OTP pour le client ${this.client.name} est : ${this.client.currentOtp}`);
  }
}