import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Psychologue } from '../models/Psychologue';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // helper=new JwtHelperService()
  private authUrl="http://localhost:3000";
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + localStorage.getItem('token') // Récupération du token JWT depuis le localStorage
  //   })
  // };
  constructor(private http: HttpClient) { }
// *******************************************student*******************************************//


signupStudent(nom: string, prenom: string, email: string, motDePasse: string): Observable<any> {
    const body = { nom, prenom, email, motDePasse, estValide: false };
    return this.http.post(`${this.authUrl}/signup`, body);
  }



  loginStudent(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // console.log(body);
    return this.http.post(`${this.authUrl}/loginstudent`, body);
  }

  public isAuthenticated() {
    let token= localStorage.getItem('token');
    // console.log(token);
    if(token){
      return true;
    }else{
      return false;
    }
  }


  // getCurrentUser(): any {
  //   const currentUser = localStorage.getItem('currentUser');
  //   if (currentUser) {
  //     return JSON.parse(currentUser);
  //   }
  //   return null;
  // }


  getUserData(){

    let token = localStorage.getItem('token');

    if(token){

      let data = JSON.parse( window.atob( token.split('.')[1] ) )
      //console.log('vbjjj');

      console.log(data);

      return data;


    }
  }
/*   setUserData(data: any) {
    // Convert data to string and store in local storage
    localStorage.setItem('token', window.btoa(JSON.stringify(data)));
  } */

  logoutUser(): Observable<any> {
    return this.http.post(`${this.authUrl}/logoutuser`, {});
    }

// *****************************************psy********************************//
  signupPsy(nom: string, prenom: string, email: string, motDePasse: string): Observable<Psychologue> {
    const body = { nom, prenom, email, motDePasse};
    return this.http.post<Psychologue>(`${this.authUrl}/signupPsy`, body);
  }
  loginPsy(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };

    return this.http.post(`${this.authUrl}/loginPsy`, body);
  }

  // ***************************************admin********************************
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  logoutAdmin(): Observable<any> {
    return this.http.post(`${this.authUrl}/logout`, {});
    }



  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const body = { email, currentPassword, newPassword };
    return this.http.post(`${this.authUrl}/password`, body);
  }



}

