import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPsyGuard implements CanActivate {
  constructor(private aus:AuthService,private router:Router){

  }
  canActivate(): boolean {
    if (this.aus.isAuthenticatedPsy()== true) {
      return true;
    } else {
      this.router.navigate(['/auth/loginPsy']);
      return false;
    }
  }

}
