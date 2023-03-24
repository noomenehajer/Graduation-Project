import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-psy',
  templateUrl: './login-psy.component.html',
  styleUrls: ['./login-psy.component.css']
})
export class LoginPsyComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]],

  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    // console.log('hi');
    if (this.form.invalid) {
      return;
    }

    const email = this.form.get('email')?.value;
    const motDePasse = this.form.get('motDePasse')?.value;

    if (!email || !motDePasse) {
      console.error('One or more values are null or undefined.');
      return;
    }
    // console.log(email);
    // console.log(motDePasse);

    this.authService.loginPsy(email, motDePasse).subscribe(
      (res) => {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('authToken', res.psy);

          this.router.navigateByUrl('/home');
      },
      (error) => {
          this.snackBar.open(error.error.message, 'OK', {
              duration: 5000,
              verticalPosition: 'top'
          });

          console.log(error);
      }
  );
    }
}
