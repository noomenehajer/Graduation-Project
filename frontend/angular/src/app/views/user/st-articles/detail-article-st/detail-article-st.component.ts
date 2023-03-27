import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-detail-article-st',
  templateUrl: './detail-article-st.component.html',
  styleUrls: ['./detail-article-st.component.css']
})
export class DetailArticleStComponent implements OnInit {
  article!: Article;
  replyContent: string;
  constructor(private route: ActivatedRoute, private articleService: ArticleService ,private http: HttpClient, private router:Router) {
    this.replyContent = '';

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

submitReply(): void {
  if (!this.replyContent) {
    return;
  }
  const reply = {
    content: this.replyContent,
    parent: this.article._id
  };
  this.articleService.addReply(reply).subscribe(() => {
    this.router.navigateByUrl(`/article/${this.article._id}`);
  });
}

}


