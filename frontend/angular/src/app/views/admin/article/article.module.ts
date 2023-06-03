import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleRoutingModule } from './article-routing.module';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { AddArticleComponent } from './add-article/add-article.component';
// import { ArticleDetailComponent } from './article-detail/article-detail.component';


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    EditArticleComponent,
    AddArticleComponent,



  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    ArticleRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ArticleModule { }
