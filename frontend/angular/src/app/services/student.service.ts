import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Student } from '../models/Student';
// import { Z } from '../models/Article';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/admin/students';

  constructor(private http: HttpClient) { }


  getAllStudents() : Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl);  }

  getStudent(id: string): Observable<Student> {
    if (!id) {
      // Gérer l'erreur ici, comme renvoyer un Observable avec une erreur 404 ou une valeur par défaut
      return throwError("ID not provided");
    }
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  editArticle(id: string, student: Student): Observable<any> {
    return this.http.patch(`${this.apiUrl}/edit/${id}`, student);
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/add`, student);
  }
}
