import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionnaireComponent } from './add-questionnaire/add-questionnaire.component';
import { DetailQuestionnaireComponent } from './detail-questionnaire/detail-questionnaire.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';
import { PubishQuestionnaireComponent } from './publish-questionnaire/publish-questionnaire.component';
import { AnsweredQuestionnaireComponent } from './answered-questionnaire/answered-questionnaire.component';
import { ListAnswersComponent } from './list-answers/list-answers.component';
import { AuthPsyGuard } from '../../guards/auth-psy.guard';

const routes: Routes = [
  { path: '', component: ListQuestionnaireComponent },
  { path: 'add', component: AddQuestionnaireComponent , canActivate: [AuthPsyGuard] },
  { path: 'edit/:id', component: EditQuestionnaireComponent, canActivate: [AuthPsyGuard] },
  { path: 'detail/:id', component: DetailQuestionnaireComponent },
  { path: 'publish/:id', component: PubishQuestionnaireComponent },
  { path: 'list/:id', component: ListAnswersComponent },
  { path: 'answers/:id', component: AnsweredQuestionnaireComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }
