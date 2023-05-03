import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Disponibilite } from '../models/disponibilite';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/psy';



  definirDisponibilite(psyId: string, jour: Date, debut: Date, fin: Date): Observable<Disponibilite> {
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
    console.log(body);
    return this.http.post<Disponibilite>(`${this.apiUrl}/disponibilites`, body, httpOptions);
  }




  getDisponibilite(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    const psyId = localStorage.getItem('psyId');
    return this.http.get(`${this.apiUrl}/getdisponibilites?psyId=${psyId}`, httpOptions);
  }



}
