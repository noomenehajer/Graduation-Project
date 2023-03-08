import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/services/Article';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  articleForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.articleForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.articleForm.get('title')!.value);
    formData.append('content', this.articleForm.get('content')!.value);
    formData.append('image', this.articleForm.get('image')!.value);

    this.articleService.addArticle(formData).subscribe(
      (article: Article) => {
        console.log('Article added successfully', article);
        this.router.navigate(['/admin/article']);
      },
      (error) => {
        console.log('Error adding article', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.articleForm.get('image')!.setValue(file);
  }

  ngOnInit(): void {}
}
