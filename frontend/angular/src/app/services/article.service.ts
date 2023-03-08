import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Article } from './Article';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:3000/api/articles';
  constructor(private http: HttpClient) { }
  getAllArticles() : Observable<Article[]>{
    return this.http.get<Article[]>(this.baseUrl);  }


    getArticle(id: string): Observable<Article> {
      if (!id) {
        // Gérer l'erreur ici, comme renvoyer un Observable avec une erreur 404 ou une valeur par défaut
        return throwError("ID not provided");
      }
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Article>(url);
    }

    addArticle(article: FormData): Observable<any> {
      return this.http.post(`${this.baseUrl}/add`, article);
    }


    editArticle(id: string, article: FormData): Observable<any> {
      return this.http.patch(`${this.baseUrl}/edit/${id}`, article);
    }

    deleteArticle(id: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }

    uploadImage(image: File): Observable<any> {
      const formData = new FormData();
      formData.append('image', image);

      return this.http.post(`${this.baseUrl}/uploads`, formData);
    }


}
