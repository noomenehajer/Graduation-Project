import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/Article';
import { Reply } from '../models/reply';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:3000/api/articles';
  constructor(private http: HttpClient) { }
    authToken:any;

    getAllArticles(): Observable<Article[]> {
      this.loadToken();

      const headers = new HttpHeaders({
        'Authorization': this.authToken,
        'Content-Type': 'application/json'
      });

      return this.http.get<Article[]>(this.baseUrl, { headers }).pipe(
        map((res: Article[]) => res)
      );
    }
      loadToken(){
        const token =localStorage.getItem('token');
        this.authToken=token;
      }

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


    createReply(articleId: string, reply: Reply): Observable<Reply> {
      return this.http.post<Reply>(`${this.baseUrl}/${articleId}/addreply`, reply);
    }


    getReplies(articleId: string): Observable<any> {
      const url = `${this.baseUrl}/${articleId}/getreply`;
      return this.http.get(url);
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
