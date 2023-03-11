import { Question } from './models/question';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { AuthModule } from './views/auth/auth.module';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';
import { ArticleListComponent } from './views/admin/article/article-list/article-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleDetailComponent } from './views/admin/article/article-detail/article-detail.component';
import { EditArticleComponent } from './views/admin/article/edit-article/edit-article.component';
import { AddArticleComponent } from './views/admin/article/add-article/add-article.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { QuestionComponent } from './question/question.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WhoAreYouComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    EditArticleComponent,
    AddArticleComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LayoutsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
