import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  private baseUrl="http://localhost:3000/admin";

  getNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications`);
  }

  markAsRead(notificationId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/notifications/${notificationId}`, { read: true });
  }
}
