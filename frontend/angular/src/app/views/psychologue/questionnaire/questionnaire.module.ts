import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { AddQuestionnaireComponent } from './add-questionnaire/add-questionnaire.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { DetailQuestionnaireComponent } from './detail-questionnaire/detail-questionnaire.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    DetailQuestionnaireComponent,
    ListQuestionnaireComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuestionnaireRoutingModule
  ]
})
export class QuestionnaireModule { }
