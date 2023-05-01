import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class LoginuserComponent  {

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
    // console.log(email);
    // console.log(motDePasse);

    this.authService.loginStudent(email, motDePasse).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        // localStorage.setItem('user', JSON.stringify(res.user));
        console.log(res.user);
        this.router.navigate(['/articlest']);
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    );

    }
//






}
