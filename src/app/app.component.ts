import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn: boolean = false;
  userName$!: Observable<string | null>;
  userPhotoUrl$!: Observable<string | null>;

  constructor(public authService: AuthService) {} 

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName$ = this.authService.getUserName();
    this.userPhotoUrl$ = this.authService.getUserPhotoUrl();
  }

  logout(): void {
    this.authService.logout();
  }
}