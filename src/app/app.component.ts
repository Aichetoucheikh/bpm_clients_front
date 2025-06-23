import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './services/auth.service'; // Adaptez le chemin
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  visibleSidebar: boolean = false;
  
  isLoggedIn$!: Observable<boolean>;
  userRole$!: Observable<string | null>;
  userName$!: Observable<string | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.userRole$ = this.authService.getUserRole();
    this.userName$ = this.authService.getUserName();
  }

  logout(): void {
    this.authService.logout();
    this.visibleSidebar = false;
  }
}
