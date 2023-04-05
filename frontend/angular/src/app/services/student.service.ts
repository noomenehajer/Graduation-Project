import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Student } from '../models/Student';
import { catchError, map } from 'rxjs/operators';
// import { Z } from '../models/Article';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/admin/students';
  private Url = 'http://localhost:3000/etudiant';

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

/////////////////////////////////////////////////////////////////////////////////////
//****** student profile ****** *// 
getProfile(id: string, headers: HttpHeaders): Observable<Student> {
    const url = `${this.Url}/${id}`;
    return this.http.get<Student>(url, { headers });
  }

  editProfile(id: string, data: FormData, headers: HttpHeaders): Observable<Student> {
    const url = `${this.Url}/${id}`;
    return this.http.put<Student>(url, data, { headers });
  }

  updatePassword(id: string, oldPassword: string, newPassword: string, headers: HttpHeaders): Observable<any> {
    const url = `${this.Url}/${id}/password`;
    const data = { oldPassword, newPassword };
    return this.http.put<any>(url, data, { headers });
  }

  encryptData(id: string, headers: HttpHeaders): Observable<any> {
    const url = `${this.Url}/${id}/anonyme`;
    return this.http.post<any>(url, null, { headers });
  }
}
