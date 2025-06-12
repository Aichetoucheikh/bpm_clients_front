import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; // FormsModule pour ngModel, NgForm pour la référence au formulaire
import { CommonModule } from '@angular/common'; // CommonModule pour *ngIf, [ngClass], etc.
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login', // Le sélecteur si vous l'utilisiez ailleurs (non nécessaire pour les composants routés)
  standalone: true,     // Indique que c'est un composant standalone
  imports: [
    CommonModule,       // Nécessaire pour les directives structurelles comme *ngIf, [ngClass]
    FormsModule         // Nécessaire pour la liaison de données bidirectionnelle [(ngModel)] et les formulaires Angular
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('jwtToken');
  }

  onSubmit(loginNgForm: NgForm) { // loginNgForm est injecté depuis le template (#loginNgForm="ngForm")
    if (loginNgForm.invalid) {
      // Marquer tous les champs comme 'touched' pour afficher les messages d'erreur si l'utilisateur n'a rien touché mais a soumis
      Object.keys(loginNgForm.controls).forEach(field => {
        const control = loginNgForm.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Formulaire invalide. Veuillez vérifier les champs.');
      return; // Empêche la soumission si le formulaire est invalide
    }

    // Logique de soumission du formulaire ici
    // Par exemple, appeler un service d'authentification
    console.log('Tentative de connexion avec :', this.credentials);
    console.log('Formulaire soumis avec succès!', loginNgForm.value);

    // Ici, vous appelleriez votre service d'authentification :
    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe({
      next: (response) => {
        console.log('Connexion réussie!');
        localStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Échec de la connexion', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    });

    // Optionnel : Réinitialiser le formulaire après une soumission réussie ou pour une nouvelle tentative
    // Pour l'instant, on ne réinitialise pas pour que l'utilisateur voie ses entrées
    // loginNgForm.resetForm();
    // this.credentials = { username: '', password: '' };
  }
}