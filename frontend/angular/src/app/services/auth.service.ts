import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginresponse } from '../models/Loginresponse';

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

  loginStudent(email: string, motDePasse: string): Observable<Loginresponse> {
    const body = { email, motDePasse };
    return this.http.post<Loginresponse>(`${this.authUrl}/loginstudent`, body);
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

