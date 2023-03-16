import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/services/adminPassword.service';

@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css']
})
export class AdminPasswordComponent implements OnInit {

  passwordForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private changePasswordService: PasswordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get f() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;
    const email = this.passwordForm.get('email')?.value;
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    this.changePasswordService.changePassword(email, currentPassword, newPassword).subscribe(
      response => {
        this.router.navigate(['/admin']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    );
  }

}