import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Loginresponse } from 'src/app/models/Loginresponse';
import { AuthService } from 'src/app/services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent {
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
    if (this.form.invalid) {
      return;
    }

    const email = this.form.get('email')?.value;
    const motDePasse = this.form.get('motDePasse')?.value;

    if (!email || !motDePasse) {
      console.error('One or more values are null or undefined.');
      return;
    }

    this.authService.loginStudent(email, motDePasse).subscribe(
      (res: Loginresponse) => {
        localStorage.setItem('authToken', res.token);
        const user = res.user;
        user.estValide = Boolean(user.estValide);
        if (!user.estValide) {
          // console.log('hi');
          this.snackBar.open('You are not authorized yet.', 'OK', {
            duration: 5000,
            verticalPosition: 'top'
          });
        } else {
          this.router.navigateByUrl('/home');
        }
      },
      (error) => {
        console.error(error);
        // this.snackBar.open('An error occurred while logging in.', 'OK', {
        this.snackBar.open('You are not authorized yet.', 'OK', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    );

  }

}
