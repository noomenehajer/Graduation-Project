import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AuthAdminGuard } from '../../guards/auth-admin.guard';

const routes: Routes = [

  {path:'article',component:ArticleListComponent,canActivate:[AuthAdminGuard]},
  {path:'article/detail/:id',component:ArticleDetailComponent,canActivate:[AuthAdminGuard]},
  {path:'article/edit/:id',component:EditArticleComponent,canActivate:[AuthAdminGuard]},
  {path:'article/add',component:AddArticleComponent,canActivate:[AuthAdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
