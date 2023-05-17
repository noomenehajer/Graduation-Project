import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Student } from '../models/Student';
import { Questionnaire } from '../models/questionnaire';
import { catchError } from 'rxjs/operators';
// import { Z } from '../models/Article';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000/admin/students';
  private url = 'http://localhost:3000/etudiant';

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
//****** student profile *******// 
getProfile(): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.get<any>(`${this.url}/profile`, { headers }).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

editProfile(formData: FormData): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.put<any>(`${this.url}/profile/edit`, formData, { headers }).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

updatePassword(ancienMotDePasse: string, nouveauMotDePasse: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.put<any>(
    `${this.url}/profile/password`,
    { ancienMotDePasse, nouveauMotDePasse },
    { headers }
  ).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

encryptData(): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.post<any>(`${this.url}/profile/anonyme`, null, { headers }).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
uploadImage(photo: File): Observable<any> {
  const formData = new FormData();
  formData.append('photo', photo);
  return this.http.post(`${this.url}/uploads`, formData);
}
///////////// Questionnaire //////////////////////

 getPublishedQuestionnaires(): Observable<Questionnaire[]> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.get<Questionnaire[]>(`${this.url}/questionnaires`, { headers }).pipe (catchError((error) => {
    console.error(error); 
    return throwError(error);
  })
);
} 

getPublishedQuestionnaireById(questionnaireId: string): Observable<Questionnaire> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.get<Questionnaire>(`${this.url}/questionnaires/${questionnaireId}`, { headers }).pipe(catchError((error) => {
  console.error(error);
  return throwError(error);
  })
  );
  }

submitAnswers(questionnaireId: string, answers: { questionId: string, text: string }[]): Observable<Questionnaire[]> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
  return this.http.post<Questionnaire[]>(`${this.url}/questionnaires/${questionnaireId}/submit`, { answers }, { headers }).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
}