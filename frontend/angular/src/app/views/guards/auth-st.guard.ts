import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStGuard implements CanActivate {
  constructor(private aus:AuthService,private router:Router){

  }
  canActivate(): boolean {
    if (this.aus.isAuthenticated()== true) {
      return true;
    } else {
      this.router.navigate(['/auth/loginuser']);
      return false;
    }
  }
  }


