import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { AddQuestionnaireComponent } from './add-questionnaire/add-questionnaire.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { DetailQuestionnaireComponent } from './detail-questionnaire/detail-questionnaire.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthPsyGuard } from '../../guards/auth-psy.guard';
import { AuthService } from 'src/app/services/auth.service';
import { PsyService } from 'src/app/services/psy.service';
import { PubishQuestionnaireComponent } from './publish-questionnaire/publish-questionnaire.component';
import { AnsweredQuestionnaireComponent } from './answered-questionnaire/answered-questionnaire.component';
import { ListAnswersComponent } from './list-answers/list-answers.component';
@NgModule({
  declarations: [
    AddQuestionnaireComponent,
    EditQuestionnaireComponent,
    DetailQuestionnaireComponent,
    ListQuestionnaireComponent,
    PubishQuestionnaireComponent,
    AnsweredQuestionnaireComponent,
    ListAnswersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuestionnaireRoutingModule
  ],
  providers: [
    AuthPsyGuard,
    AuthService,
    PsyService] 
})
export class QuestionnaireModule { }
