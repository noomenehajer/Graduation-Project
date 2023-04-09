import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/psy'; 



  definirDisponibilite(psyId: string, jour: string, debut: string, fin: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token') // replace with your token implementation
      })
    };
    const body = {
      psy: psyId,
      seance: [
        {
          jour,
          debut,
          fin
        }
      ]
    };

    return this.http.post(`${this.apiUrl}/disponibilites`, body,httpOptions);
  }



  getDisponibilite(psyId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token') // replace with your token implementation
      })
    };
    return this.http.get(`${this.apiUrl}/disponibilites`,httpOptions);
  }
}
