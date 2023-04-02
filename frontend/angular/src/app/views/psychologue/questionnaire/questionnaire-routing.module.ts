import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionnaireComponent } from './add-questionnaire/add-questionnaire.component';
import { DetailQuestionnaireComponent } from './detail-questionnaire/detail-questionnaire.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';

const routes: Routes = [
  { path: 'psy/questionnaire', component: ListQuestionnaireComponent },
  { path: 'psy/questionnaire/add', component: AddQuestionnaireComponent },
  { path: 'psy/questionnaire/edit/:id', component: EditQuestionnaireComponent },
  { path: 'psy/questionnaire/detail/:id', component: DetailQuestionnaireComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionnaireRoutingModule { }
