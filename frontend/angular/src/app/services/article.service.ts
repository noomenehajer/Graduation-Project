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

    // getAllArticles(): Observable<Article[]> {
    //   this.loadToken();

    //   const headers = new HttpHeaders({
    //     'Authorization': this.authToken,
    //     'Content-Type': 'application/json'
    //   });

    //   return this.http.get<Article[]>(this.baseUrl, { headers }).pipe(
    //     map((res: Article[]) => res)
    //   );
    // }


    getAllArticles(): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token') // replace with your token implementation
        })
      };
      return this.http.get<any>(this.baseUrl, httpOptions);
    }
      loadToken(){
        const token =localStorage.getItem('token');
        this.authToken=token;
      }

    getArticle(id: string): Observable<Article> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token') // replace with your token implementation
        })
      };
      if (!id) {
        // Gérer l'erreur ici, comme renvoyer un Observable avec une erreur 404 ou une valeur par défaut
        return throwError("ID not provided");
      }
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Article>(url,httpOptions);
    }

    addArticle(article: FormData): Observable<any> {
      return this.http.post(`${this.baseUrl}/add`, article);
    }


    createReply(articleId: string, reply: Reply): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token') // replace with your token implementation
        })
      };

      const payload = {
        content: reply.content,
        student: {
          _id: reply.student._id,
          nom: reply.student.nom,
          prenom: reply.student.prenom,
        }
      };

      return this.http.post<any>(`${this.baseUrl}/${articleId}/addreply`, payload, httpOptions);
    }



    getReplies(articleId: string): Observable<any> {
      const url = `${this.baseUrl}/${articleId}/getreply`;
      return this.http.get<any>(url);
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
