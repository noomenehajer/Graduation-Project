import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  createForm(form: Form): Observable<Form> {
    return this.http.post<Form>('/api/forms', form);
  }

  getForm(id: string): Observable<Form> {
    return this.http.get<Form>(`/api/forms/${id}`);
  }
}
