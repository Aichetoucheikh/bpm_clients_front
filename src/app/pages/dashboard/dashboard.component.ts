import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs';
import { Employe } from '../../models/employe';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  userName$: Observable<string | null>;
  
  stats = {
    totalClients: 0,
    totalEmployes: 0
  };
  
  employesSuspendus: Employe[] = [];

  pieChartData: { name: string, value: number }[] = [];
  
  pieChartColorScheme: Color = {
    name: 'bpmPalette',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#28a745', '#dc3545']
  };

  legendPosition: LegendPosition = LegendPosition.Below;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {
    this.userName$ = this.authService.getUserName();
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.stats.totalClients = data.totalClients;
      this.stats.totalEmployes = data.totalEmployes;
      
      this.pieChartData = [
        { name: 'Clients Actifs', value: data.clientsActifs },
        { name: 'Clients Bloqués', value: data.clientsBloques }
      ];

      if (this.hasPermission('MANAGE_EMPLOYES')) {
        this.employesSuspendus = data.employesSuspendus;
      }
    });
  }

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }
}