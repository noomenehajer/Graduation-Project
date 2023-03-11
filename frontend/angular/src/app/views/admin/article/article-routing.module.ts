import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

const routes: Routes = [

  {path:'article',component:ArticleListComponent},
  {path:'article/detail/:id',component:ArticleDetailComponent},
  {path:'article/edit/:id',component:EditArticleComponent},
  {path:'article/add',component:AddArticleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
