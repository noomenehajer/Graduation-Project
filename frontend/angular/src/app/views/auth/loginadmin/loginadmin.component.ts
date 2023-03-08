import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})

export class LoginadminComponent {
  email: string;
  password: string;
  
  constructor(private adminService: AdminService) {}
  
  onSubmit(): void {
     this.adminService.login(this.email, this.password)
        .subscribe(response => {
          const token = response.token; // store the JWT token in localStorage or a cookie
          // redirect to the admin dashboard or some other protected route
        }, error => {
          console.error(error);
          // display an error message to the user
        });
    }
  
}
