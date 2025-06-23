import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // CORRECTION : Importe la classe correcte depuis le bon fichier
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService, // CORRECTION : Injection de AuthService
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedInSync()) {
      this.authService.logout();
    }
  }

  onSubmit(loginNgForm: NgForm) {
    if (loginNgForm.invalid) {
      return;
    }

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: (response: any) => {
          console.log('Connexion réussie !');
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.error('Échec de la connexion', error);
        }
      });
  }
}