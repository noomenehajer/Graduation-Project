import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    // return this.http.get<Student[]>(this.apiUrl);
    const url = `${this.apiUrl}?estValide=true`;
    return this.http.get<Student[]>(this.apiUrl);

  }



      getNonValidStudents(): Observable<Student[]> {
        const url = `${this.apiUrl}/invalid`;
        return this.http.get<Student[]>(url);
      }


  getStudent(id: string): Observable<Student> {
    if (!id) {
      // Gérer l'erreur ici, comme renvoyer un Observable avec une erreur 404 ou une valeur par défaut
      return throwError("ID not provided");
    }
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url);
  }
  editStudent(id: string, student: Student): Observable<Student> {
    const url = `${this.apiUrl}/edit/${id}`;
    return this.http.patch<Student>(url, student);
  }



  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/add`, student);
  }

  // getStudentsWithPagination(page: number, limit: number): Observable<Student[]> {
  //   const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
  //   return this.http.get<Student[]>(url);
  // }

  getStudentsWithPagination(page: number, pageSize: number): Observable<Student[]> {
    const options = {
      params: new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
    };
    return this.http.get<Student[]>(`${this.apiUrl}/students`, options);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  toggleSuspendAccount(id: string): Observable<Student> {
    const url = `${this.apiUrl}/suspend/${id}`;
    return this.http.put<Student>(url, {});
  }


}
