import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private passwordUrl = 'http://localhost:3000/password/';

  constructor(private http: HttpClient) { }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const body = { email, currentPassword, newPassword };
    return this.http.post(this.passwordUrl, body);
  }
  
}
