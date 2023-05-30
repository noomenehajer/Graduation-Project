import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';
import { Questionnaire, Question  } from '../models/questionnaire';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  apiUrl = 'http://localhost:3000/questionnaires';

  constructor(private http: HttpClient) { }

  getQuestionnaires(): Observable<Questionnaire[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Questionnaire[]>(this.apiUrl, { headers });
  }

  getQuestionnaireById(id: string): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Questionnaire>(url, { headers });
  }

  createQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Questionnaire>(this.apiUrl, questionnaire, { headers });
  }

  updateQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${questionnaire._id}`;
    return this.http.put<Questionnaire>(url, questionnaire, { headers });
  }

  deleteQuestionnaire(id: string): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Questionnaire>(url, { headers });
  }

  createQuestion(questionnaireId: string, question: Question): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${questionnaireId}/questions`;
    return this.http.post<Questionnaire>(url, question, { headers });
  }

  updateQuestion(questionnaireId: string, questionId: string, question: Question): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${questionnaireId}/questions/${questionId}`;
    return this.http.put<Questionnaire>(url, question, { headers });
  }

  deleteQuestion(questionnaireId: string, questionId: string): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${questionnaireId}/questions/${questionId}`;
    return this.http.delete<Questionnaire>(url, { headers });
  }
  
  getOptions(questionnaireId: string, questionId: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any[]>(`${this.apiUrl}/${questionnaireId}/questions/${questionId}/options`, { headers });
  }

  addOption(questionnaireId: string, questionId: string, option: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(`${this.apiUrl}/${questionnaireId}/questions/${questionId}/options`, option, { headers });
  }

  deleteOption(questionnaireId: string, questionId: string, optionId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<any>(`${this.apiUrl}/${questionnaireId}/questions/${questionId}/options/${optionId}`, { headers });
  }

  publishQuestionnaire(questionnaireId: string, etudiantIds: string[]): Observable<Questionnaire> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${questionnaireId}/publish`;
    return this.http.put<Questionnaire>(url, { etudiantIds}, { headers });
  }

  getAnsweredQuestionnaires(studentId: string): Observable<Questionnaire[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const url = `${this.apiUrl}/${studentId}/answeredQuestionnaires`;
    return this.http.get<Questionnaire[]>(url, { headers });
  }

}
