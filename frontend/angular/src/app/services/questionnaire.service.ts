import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form';
import { Question } from '../models/question';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private formsUrl = 'http://localhost:3000/forms';

  constructor(private http: HttpClient) { }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.formsUrl);
  }

  getForm(id: string): Observable<Form> {
    return this.http.get<Form>(`${this.formsUrl}/${id}`);
  }

  createForm(title: string, description: string): Observable<Form> {
    return this.http.post<Form>(this.formsUrl, { title, description });
  }

  
  updateForm(id: string): Observable<Form> {
    const updatedForm = { title: 'new title', description: 'new description' }; // sample data, replace with your own
    return this.http.put<Form>(`${this.formsUrl}/${id}`, updatedForm);
  }
  

  deleteForm(id: string): Observable<any> {
    return this.http.delete(`${this.formsUrl}/${id}`);
  }

  getQuestions(formId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.formsUrl}/${formId}/questions`);
  }

  createQuestion(formId: string, text: string, type: string, options?: string[]): Observable<Question> {
    return this.http.post<Question>(`${this.formsUrl}/${formId}/questions`, { text, type, options });
  }

  updateQuestion(formId: string, questionId: string, text: string, type: string, options?: string[]): Observable<Question> {
    return this.http.put<Question>(`${this.formsUrl}/${formId}/questions/${questionId}`, { text, type, options });
  }

  deleteQuestion(formId: string, questionId: string): Observable<any> {
    return this.http.delete(`${this.formsUrl}/${formId}/questions/${questionId}`);
  }

}