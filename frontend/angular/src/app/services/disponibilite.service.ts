import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Disponibilite } from '../models/disponibilite';
import { Rendezvous } from '../models/rendezvous';
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
    // console.log(body);
    return this.http.post<Disponibilite>(`${this.apiUrl}/disponibilites`, body, httpOptions);
  }


  demanderRendezVous(etudiantId: string, disponibiliteId:string,type:string,commentaire?: string): Observable<Rendezvous> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    const body = {
      etudiantId,
      disponibiliteId,
      type,
      commentaire
    };
    // console.log(body);
    return this.http.post<Rendezvous>(`${this.apiUrl}/demanderRv`, body, httpOptions);
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


  getRvpsy(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    const psyId = localStorage.getItem('psyId');
    return this.http.get(`${this.apiUrl}/getRV?psyId=${psyId}`, httpOptions);
  }

  getDisponibiliteByPsyId(psyId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };

    return this.http.get(`${this.apiUrl}/getDisponibiliteByPsyId/${psyId}`, httpOptions);
  }

  annulerRendezVous(etudiantId: string, disponibiliteId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    const body = {
      etudiantId,
      disponibiliteId
    };
    return this.http.delete<any>(`${this.apiUrl}/annulerRv`, {...httpOptions, body });
  }

  deleteDisponibilite(disponibiliteId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    const url = `${this.apiUrl}/${disponibiliteId}`;
    return this.http.delete(url,httpOptions);
  }
// getRendezVousByDisponibilite(disponibiliteId: string): Observable<Rendezvous[]> {
//   const url = `${this.apiUrl}/getRendezVousByDisponibilite/${disponibiliteId}`;
//   return this.http.get<Rendezvous[]>(url);
// }




}
