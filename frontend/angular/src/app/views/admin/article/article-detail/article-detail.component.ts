import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit{

  article!: Article;

  constructor(private route: ActivatedRoute, private articleService: ArticleService ,private http: HttpClient) {


  }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.articleService.getArticle(id).subscribe((data) => {
        this.article = data;
      });
  }
}



}
