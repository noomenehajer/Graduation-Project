import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { AddQuestionnaireComponent } from './add-questionnaire/add-questionnaire.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { DetailQuestionnaireComponent } from './detail-questionnaire/detail-questionnaire.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';


@NgModule({
  declarations: [
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    DetailQuestionnaireComponent,
    ListQuestionnaireComponent
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule
  ]
})
export class QuestionnaireModule { }
