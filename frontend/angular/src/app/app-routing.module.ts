import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AddArticleComponent } from './views/admin/article/add-article/add-article.component';
import { ArticleDetailComponent } from './views/admin/article/article-detail/article-detail.component';
import { ArticleListComponent } from './views/admin/article/article-list/article-list.component';
import { EditArticleComponent } from './views/admin/article/edit-article/edit-article.component';
import { LoginadminComponent } from './views/auth/loginadmin/loginadmin.component';
import { LoginuserComponent } from './views/auth/loginuser/loginuser.component';
import { HomeComponent } from './views/user/home/home.component';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';

const routes: Routes = [

{path:'admin',component:AdminLayoutComponent,children:[
  // { path: 'loginadmin', component: LoginadminComponent }
  {path:'article',component:ArticleListComponent},
  {path:'article/detail/:id',component:ArticleDetailComponent},
  {path:'article/edit/:id',component:EditArticleComponent},
  {path:'article/add',component:AddArticleComponent},
]},
{ path: 'loginadmin', component: LoginadminComponent },
{ path: 'loginuser', component: LoginuserComponent },
{path:'',component:UserLayoutComponent,children:[
  {path:'',component:HomeComponent}
]},
{path:'home',component:WhoAreYouComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
