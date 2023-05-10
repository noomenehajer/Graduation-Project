import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthStGuard } from '../../guards/auth-st.guard';
import { AnswerQuestionnaireComponent } from './answer-questionnaire.component';
const routes: Routes = [
  { path: ':id', component:AnswerQuestionnaireComponent , canActivate: [AuthStGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswerQuestionnaireRoutingModule { }
