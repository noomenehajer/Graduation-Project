import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterGuard implements CanActivate {
  constructor(private aus:AuthService,private router:Router){
   
  }
  canActivate(): boolean {
    if (this.aus.isAuthenticated()== false) {
      return true;
    } else {
      this.router.navigate(['/articlest']);
      return false;
    }
  }

}
