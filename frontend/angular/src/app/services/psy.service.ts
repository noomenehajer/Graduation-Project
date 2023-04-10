import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Psychologue } from '../models/Psychologue';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PsyService {
  private apiUrl = 'http://localhost:3000/admin/psychologues';
  private url = 'http://localhost:3000/psych';

  constructor(private http: HttpClient) { }

  getAllPsychologues() : Observable<Psychologue[]>{
    return this.http.get<Psychologue[]>(this.apiUrl);
   }

  getPsychologue(id: string): Observable<Psychologue> {
    if (!id) {
      // Gérer l'erreur ici, comme renvoyer un Observable avec une erreur 404 ou une valeur par défaut
      return throwError("ID not provided");
    }
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Psychologue>(url);
  }

  editPsychologue(id: string, psychologue: Psychologue): Observable<Psychologue> {
    return this.http.patch<Psychologue>(`${this.apiUrl}/edit/${id}`, psychologue);
  }
  addPsychologue(psychologue: Psychologue): Observable<Psychologue> {
    return this.http.post<Psychologue>(`${this.apiUrl}/add`, psychologue);
  }

  deletePsy(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
   getNonValidPsy(): Observable<Psychologue[]> {
      const url = `${this.apiUrl}/invalidpsy`;
  return this.http.get<Psychologue[]>(url);
    }
    /////////////////////////profile//////////////////////////////////////////
    getProfile(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.get<any>(`${this.url}/profile`, { headers });
    }
   
    updateProfile(formData: FormData): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.put<any>(`${this.url}/profile/edit`, formData, { headers }).pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
    }

    changePassword(ancienMotDePasse: string, nouveauMotDePasse: string): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      });
      const body = {
        ancienMotDePasse,
        nouveauMotDePasse
      };
      return this.http.put<any>(`${this.url}/profile/password`, body, { headers });
    }  
    
    uploadImage(photo: File): Observable<any> {
      const formData = new FormData();
      formData.append('photo', photo);
      return this.http.post(`${this.url}/uploads`, formData);
    }
}
