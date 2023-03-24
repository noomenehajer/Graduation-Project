import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginresponse } from '../models/Loginresponse';
import { tap } from 'rxjs/operators';
import { Psychologue } from '../models/Psychologue';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl="http://localhost:3000";

  constructor(private http: HttpClient) { }

  signupStudent(nom: string, prenom: string, email: string, motDePasse: string): Observable<any> {
    const body = { nom, prenom, email, motDePasse, estValide: false };
    return this.http.post(`${this.authUrl}/signup`, body);
  }

  signupPsy(nom: string, prenom: string, email: string, motDePasse: string): Observable<Psychologue> {
    const body = { nom, prenom, email, motDePasse};
    return this.http.post<Psychologue>(`${this.authUrl}/signupPsy`, body);
  }

  loginStudent(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };
    // console.log(body);
    return this.http.post(`${this.authUrl}/loginstudent`, body);
  }

  loginPsy(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };

    return this.http.post(`${this.authUrl}/loginPsy`, body);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  logoutAdmin(): Observable<any> {
    return this.http.post(`${this.authUrl}/logout`, {});
    }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const body = { email, currentPassword, newPassword };
    return this.http.post(`${this.authUrl}/password`, body);
  }

  // getCurrentUser(): any {
  //   const currentUser = localStorage.getItem('currentUser');
  //   if (currentUser) {
  //     return JSON.parse(currentUser);
  //   }
  //   return null;
  // }

}

