import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/services/Article';
import { ArticleService } from 'src/app/services/article.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  imageFile: File | null = null;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
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
    this.article.updatedAt = new Date();

    // create a new FormData object
    const formData = new FormData();
    formData.append('title', this.article.title);
    formData.append('content', this.article.content);
    formData.append('updatedAt', this.article.updatedAt.toString());

    // append the new image file if it exists
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }

    this.articleService.editArticle(this.id, formData).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/admin/article']);
      },
      error => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: Event) {
    this.imageFile = (event.target as HTMLInputElement).files![0];
  }



}


