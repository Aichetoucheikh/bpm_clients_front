import { Component, Input } from '@angular/core';
// Importe l'interface Client depuis clients.component.ts
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  @Input() client!: Client;

  getStatusClass(status: Client['ClientStatus']): string {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Inactive': return 'status-inactive';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  }
}
