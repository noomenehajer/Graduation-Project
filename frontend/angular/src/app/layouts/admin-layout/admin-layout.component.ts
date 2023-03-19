import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logoutAdmin().subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('token');
        this.router.navigate(['/loginadmin']);      },
      (error) => {
        console.log(error);
      }
    );
  }
}
