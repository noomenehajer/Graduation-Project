import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  changePassword(email: string, password: string, newPassword: string): Observable<void> {
    const url = `${this.apiUrl}/password`;
    const body = { email,password, newPassword };
    return this.http.post<void>(url, body);
  }
  
}
