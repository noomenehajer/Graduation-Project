import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})

export class LoginadminComponent implements OnInit{
  loginForm!: FormGroup;
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder, private adminService: AuthService , private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      this.adminService.login(email, password).subscribe(
        response => {
          const token = response.token;
          // Store the JWT token in localStorage or a cookie
          localStorage.setItem('token', token);
          // Redirect to the admin dashboard
          this.router.navigate(['/admin/users']);
        },
        error => {
          console.error(error);
          // Display an error message to the user
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
  }
}
