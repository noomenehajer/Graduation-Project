import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-psy',
  templateUrl: './signup-psy.component.html',
  styleUrls: ['./signup-psy.component.css']
})
export class SignupPsyComponent {

  formPsy = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]],
    // motDePasseConfirm: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}



  onSubmit(): void {
    if (this.formPsy.invalid) {
      return;
    }

    const nom = this.formPsy.get('nom')?.value;
    const prenom = this.formPsy.get('prenom')?.value;
    const email = this.formPsy.get('email')?.value;
    const motDePasse = this.formPsy.get('motDePasse')?.value;

    if (!nom || !prenom || !email || !motDePasse) {
      console.error('One or more values are null or undefined.');
      return;
    }

    this.authService.signupPsy(nom, prenom, email, motDePasse).subscribe(
      () => {
        this.router.navigateByUrl('/loginPsy');
      },
      (error) => {
        console.error(error);
      }
    );
  }


  }


