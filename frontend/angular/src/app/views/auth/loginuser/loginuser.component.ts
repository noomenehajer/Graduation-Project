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

  // form: FormGroup;

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.form = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     motDePasse: ['', Validators.required]
  //   });
  // }
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

    this.authService.loginStudent(email, motDePasse).subscribe(
      (res) => {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('authToken', res.user);

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
//




  // onSubmit() {
  //   if (this.form.valid) {
  //     const { email, motDePasse } = this.form.value;
  //     this.authService.loginStudent(email, motDePasse).subscribe(
  //       (response: Loginresponse) => {
  //         this.router.navigate(['/dashboard']);
  //       },
  //       (error) => {
  //         console.error(error);
  //         if (error.message === 'You are not authorized yet') {
  //           this.form.setErrors({ invalid: true });
  //           // TODO: Display a message to the user informing them they are not authorized yet
  //         } else {
  //           // TODO: Display a generic error message to the user
  //         }
  //       }
  //     );
  //   }
  // }


}
