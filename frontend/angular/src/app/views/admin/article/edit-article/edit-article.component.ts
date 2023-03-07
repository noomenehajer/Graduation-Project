import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/services/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit  {


  article: Article = {
    _id: '',
    title: '',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    image:''
  };
  id: string = '';

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.articleService.getArticle(this.id).subscribe(
      data => {
        this.article = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {

    console.log('Before update:', this.article);
  this.article.updatedAt = new Date(); // update the updatedAt value to the current date
  console.log('After update:', this.article);
    this.articleService.editArticle(this.id, this.article).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/admin/article']);
      },
      error => {
        console.log(error);
      }
    );
  }

}


