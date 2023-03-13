import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Psychologue } from '../models/Psychologue';

@Injectable({
  providedIn: 'root'
})
export class PsyService {
  private apiUrl = 'http://localhost:3000/admin/psychologues';

  constructor(private http: HttpClient) { }


  getAllPsychologues() : Observable<Psychologue[]>{
    return this.http.get<Psychologue[]>(this.apiUrl);  }

  getPsychologue(id: string): Observable<Psychologue> {
    if (!id) {
      // Gérer l'erreur ici, comme renvoyer un Observable avec une erreur 404 ou une valeur par défaut
      return throwError("ID not provided");
    }
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Psychologue>(url);
  }

  editPsychologue(id: string, psychologue: Psychologue): Observable<any> {
    return this.http.patch(`${this.apiUrl}/edit/${id}`, psychologue);
  }
  addPsychologue(psychologue: Psychologue): Observable<Psychologue> {
    return this.http.post<Psychologue>(`${this.apiUrl}/add`, psychologue);
  }

}
