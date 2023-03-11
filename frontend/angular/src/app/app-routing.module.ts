import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ArticleRoutingModule } from './views/admin/article/article-routing.module';
import { ArticleModule } from './views/admin/article/article.module';
import { LoginadminComponent } from './views/auth/loginadmin/loginadmin.component';
import { LoginuserComponent } from './views/auth/loginuser/loginuser.component';
import { HomeComponent } from './views/user/home/home.component';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';

const routes: Routes = [

{path:'admin',component:AdminLayoutComponent,children:[
  // { path: 'loginadmin', component: LoginadminComponent }
  {
    path: '',
    loadChildren: () => import('./views/admin/article/article.module').then(m => m.ArticleModule)
  }
]},
{ path: 'loginadmin', component: LoginadminComponent },
{ path: 'loginuser', component: LoginuserComponent },
{path:'',component:UserLayoutComponent,children:[
  {path:'',component:HomeComponent}
]},
{path:'home',component:WhoAreYouComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes),ArticleRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
