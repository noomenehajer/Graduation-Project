import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { PasswordService } from 'src/app/services/adminPassword.service';


@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css']
})
export class AdminPasswordComponent implements OnInit {
  passwordForm!: FormGroup; // initialisation de la propriété passwordForm

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private router: Router
  ) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.passwordForm.get('email')!.value;
    const password = this.passwordForm.get('password')!.value;
    const newPassword = this.passwordForm.get('newPassword')!.value;
    this.passwordService.changePassword(email, password, newPassword).subscribe(
      () => {
        this.router.navigate(['/admin']);
        alert('Mot de passe changé avec succès');
      },
      (error) => {
        console.log(error);
      }
    );
  }

}