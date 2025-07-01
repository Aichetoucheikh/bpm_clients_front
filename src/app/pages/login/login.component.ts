import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { identifiantConnexion: '', motDePasse: '' };
  
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  onSubmit(loginNgForm: NgForm): void {
    this.errorMessage = null;
    if (loginNgForm.invalid) return;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || "Identifiant ou mot de passe incorrect.";
      }
    });
  }
}