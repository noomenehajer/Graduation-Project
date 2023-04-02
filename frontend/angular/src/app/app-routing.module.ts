import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ArticleRoutingModule } from './views/admin/article/article-routing.module';
import { AuthRoutingModule } from './views/auth/auth-routing.module';
import { HomeComponent } from './views/user/home/home.component';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';
import { AdminPasswordComponent } from './views/admin/admin-password/admin-password.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { QuestionnaireRoutingModule } from './views/psychologue/questionnaire/questionnaire-routing.module';
import { PsyLayoutComponent } from './layouts/psy-layout/psy-layout.component';
import { AuthGuard } from './views/guards/auth.guard';
import { AuthStGuard } from './views/guards/auth-st.guard';


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
      {path:'loginuser',loadChildren:()=>import('./views/auth/auth.module').then(m=>m.AuthModule)},
      {path:'articlest',loadChildren:()=>import('./views/user/st-articles/st-articles.module').then(m=>m.StArticlesModule)},

    ]
  },
  // { path: 'home', component: WhoAreYouComponent },
//{path:'home',component:NavbarComponent,children:[

 {path:'psy',
component:PsyLayoutComponent,
children:[ 
{ path: 'questionnaire', loadChildren:()=>import('./views/psychologue/questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)},
]}

// ]},
  // {path:'**',component:ErrorComponent};
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ArticleRoutingModule,AuthRoutingModule,QuestionnaireRoutingModule],
  exports: [RouterModule]
/*   imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], */

})
export class AppRoutingModule { }
