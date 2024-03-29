import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ArticleRoutingModule } from './views/admin/article/article-routing.module';
import { AuthRoutingModule } from './views/auth/auth-routing.module';
import { HomeComponent } from './views/user/home/home.component';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';
import { AdminPasswordComponent } from './views/admin/admin-password/admin-password.component';
import { QuestionnaireRoutingModule } from './views/psychologue/questionnaire/questionnaire-routing.module';
import { AuthGuard } from './views/guards/auth.guard';
import { AuthStGuard } from './views/guards/auth-st.guard';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { CalendrierComponent } from './views/psychologue/calendrier/calendrier.component';
import { SetAvailabilityComponent } from './views/psychologue/set-availability/set-availability.component';
import { AuthPsyGuard } from './views/guards/auth-psy.guard';
import { RvConfirmeeComponent } from './views/psychologue/rv-confirmee/rv-confirmee.component';
import { LoginRegisterGuard } from './views/guards/login-register.guard';
import { NotFountComponent } from './views/not-found/not-found.component';
import { VideoCallComponent } from './views/video-call/video-call.component';

const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./views/admin/article/article.module').then(m => m.ArticleModule) },
      { path: 'users', loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule) },
      {path:'psy',loadChildren:()=>import('./views/admin/psy/psy.module').then(m=>m.PsyModule)},
      { path: 'password', component: AdminPasswordComponent },
      { path: 'dash' , component: DashboardComponent},
    ]
  },
  // { path: 'loginadmin', loadChildren:()=>import('./views/auth/auth.module').then(m => m.AuthModule)},
  { path: 'logout', loadChildren:()=>import('./layouts/layouts.module').then(m => m.LayoutsModule)},
  // { path: 'signup', loadChildren:()=>import('./views/auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {path:'auth',loadChildren:()=>import('./views/auth/auth.module').then(m=>m.AuthModule)},
      {path: '', component: HomeComponent },
      {path:'articlest',loadChildren:()=>import('./views/user/st-articles/st-articles.module').then(m=>m.StArticlesModule)},
      {path:'profile',loadChildren:()=>import('./views/user/profile/profile.module').then(m=>m.ProfileModule)},
      {path: 'profilepsy', loadChildren:()=>import('./views/psychologue/profil/profil.module').then(m => m.ProfilModule)},
      {path:'psychologues',loadChildren:()=>import('./views/user/student-psychologues/student-psychologues.module').then(m=>m.StudentPsychologuesModule)},
      {path:'calendar',loadChildren:()=>import('./views/psychologue/calendrier/calendrier.module').then(m=>m.CalendrierModule)},
      {path:'quiz',loadChildren:()=>import('./views/user/list-quiz/list-quiz.module').then(m=>m.ListQuizModule)},
      {path:'answer',loadChildren:()=>import('./views/user/answer-questionnaire/answer-questionnaire.module').then(m=>m.AnswerQuestionnaireModule)},
      {path:'whoareyou',component:WhoAreYouComponent},
      {path: 'psy/questionnaire', loadChildren:()=>import('./views/psychologue/questionnaire/questionnaire.module').then(m => m.QuestionnaireModule)},
//      {path:'answered',loadChildren:()=>import('./views/user/answered-quiz/answered-quiz.module').then(m=>m.AnsweredQuizModule)},

    ]
  },
  {path:'room/:roomId',component:VideoCallComponent},
  {path:'**',component:NotFountComponent},
  // { path: 'setAvail', component: SetAvailabilityComponent,canActivate:[AuthPsyGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes),AuthRoutingModule,ArticleRoutingModule],
  exports: [RouterModule],

})
export class AppRoutingModule { }
