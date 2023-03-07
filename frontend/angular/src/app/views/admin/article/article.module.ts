import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleRoutingModule } from './article-routing.module';
// import { AddArticleComponent } from './add-article/add-article.component';
// import { ArticleDetailComponent } from './article-detail/article-detail.component';


@NgModule({
  declarations: [
    // ArticleDetailComponent



  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule
  ]
})
export class ArticleModule { }
