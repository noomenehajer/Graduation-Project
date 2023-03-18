import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    console.log("hi");
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
      (res) => {
        localStorage.setItem('authToken', res.token);
        if (res.estValide===false) {
          console.log("hello")
          this.snackBar.open('You are not authorized yet.', 'OK', {
            duration: 5000, // 5 seconds
            verticalPosition: 'top' // Positioning the snackbar on top
          });
        } else {
          this.router.navigateByUrl('/home');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
