import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ArticleRoutingModule } from './views/admin/article/article-routing.module';
import { AuthRoutingModule } from './views/auth/auth-routing.module';
import { LoginadminComponent } from './views/auth/loginadmin/loginadmin.component';
import { LoginuserComponent } from './views/auth/loginuser/loginuser.component';
import { HomeComponent } from './views/user/home/home.component';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';
import { AdminPasswordComponent } from './views/admin/admin-password/admin-password.component';
import { SignupUserComponent } from './views/auth/signup-user/signup-user.component';
import { NotificationComponent } from './layouts/notification/notification.component';
import { PsyNonValideComponent } from './views/admin/psy/psy-non-valide/psy-non-valide.component';
import { ListArticlesStComponent } from './views/user/st-articles/list-articles-st/list-articles-st.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';


const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./views/admin/article/article.module').then(m => m.ArticleModule) },
      { path: 'users', loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule) },
      {path:'psy',loadChildren:()=>import('./views/admin/psy/psy.module').then(m=>m.PsyModule)},
      { path: 'password', component: AdminPasswordComponent },
      // {path:'notifications',component:NotificationComponent}


    ]
  },
  { path: 'loginadmin', loadChildren:()=>import('./views/auth/auth.module').then(m => m.AuthModule)},
  { path: 'logout', loadChildren:()=>import('./layouts/layouts.module').then(m => m.LayoutsModule)},
  // { path: 'signup', loadChildren:()=>import('./views/auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {path:'signup',loadChildren:()=>import('./views/auth/auth.module').then(m=>m.AuthModule)},
      {path:'signupPsy',loadChildren:()=>import('./views/auth/auth.module').then(m=>m.AuthModule)},
      {path:'loginuser',loadChildren:()=>import('./views/auth/auth.module').then(m=>m.AuthModule)},
      {path:'loginPsy',loadChildren:()=>import('./views/auth/auth.module').then(m=>m.AuthModule)},

    ]
  },
  // { path: 'home', component: WhoAreYouComponent },
{path:'home',component:NavbarComponent,children:[
  {path:'articlest',loadChildren:()=>import('./views/user/st-articles/st-articles.module').then(m=>m.StArticlesModule)},

]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),ArticleRoutingModule,AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
