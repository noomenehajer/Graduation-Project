import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private aus:AuthService,private router:Router){

  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve,reject)=>{
        if(this.aus.isAuthenticated()){
          resolve(true)
        }
        else{
          this.router.navigate(['/loginuser'],{queryParams:{returnUrl:state.url}})
          reject('Not authenticated')
        }
      })
  }


  // canActivateChild(): boolean {
  //   if (this.aus.isAuthenticated()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/loginuser']);
  //     return false;
  //   }
  // }


  }

