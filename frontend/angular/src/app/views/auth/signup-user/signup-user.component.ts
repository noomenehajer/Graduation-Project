import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit{
  form = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(8)]],
    // motDePasseConfirm: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
  if (this.form.invalid) {
    return;
  }

  const nom = this.form.get('nom')?.value;
  const prenom = this.form.get('prenom')?.value;
  const email = this.form.get('email')?.value;
  const motDePasse = this.form.get('motDePasse')?.value;

  if (!nom || !prenom || !email || !motDePasse) {
    console.error('One or more values are null or undefined.');
    return;
  }

  this.authService.signupStudent(nom, prenom, email, motDePasse).subscribe(
    () => {
      this.router.navigateByUrl('/loginuser');
    },
    (error) => {
      console.error(error);
    }
  );
}


}
