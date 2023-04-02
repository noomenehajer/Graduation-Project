import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire, Question  } from '../models/questionnaire';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  apiUrl = 'http://localhost:3000/questionnaires';

  constructor(private http: HttpClient) { }

  getQuestionnaires(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(this.apiUrl);
  }

  getQuestionnaireById(id: string): Observable<Questionnaire> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Questionnaire>(url);
  }

  createQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(this.apiUrl, questionnaire);
  }

  updateQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    const url = `${this.apiUrl}/${questionnaire._id}`;
    return this.http.put<Questionnaire>(url, questionnaire);
  }

  deleteQuestionnaire(id: string): Observable<Questionnaire> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Questionnaire>(url);
  }

  createQuestion(questionnaireId: string, question: Question): Observable<Questionnaire> {
    const url = `${this.apiUrl}/${questionnaireId}/questions`;
    return this.http.post<Questionnaire>(url, question);
  }

  updateQuestion(questionnaireId: string, questionId: string, question: Question): Observable<Questionnaire> {
    const url = `${this.apiUrl}/${questionnaireId}/questions/${questionId}`;
    return this.http.put<Questionnaire>(url, question);
  }

  deleteQuestion(questionnaireId: string, questionId: string): Observable<Questionnaire> {
    const url = `${this.apiUrl}/${questionnaireId}/questions/${questionId}`;
    return this.http.delete<Questionnaire>(url);
  }
  
  getOptions(questionnaireId: string, questionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${questionnaireId}/questions/${questionId}/options`);
  }

  addOption(questionnaireId: string, questionId: string, option: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${questionnaireId}/questions/${questionId}/options`, option);
  }

  deleteOption(questionnaireId: string, questionId: string, optionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${questionnaireId}/questions/${questionId}/options/${optionId}`);
  }
}
