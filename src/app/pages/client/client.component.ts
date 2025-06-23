import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  @Input() client!: Client;

  getStatusClass(status: Client['status']): string {
    switch (status) {
      case 'ACTIVE': return 'status-active';
      case 'BLOCKED': return 'status-blocked';
      default: return 'status-unknown';
    }
  }
}