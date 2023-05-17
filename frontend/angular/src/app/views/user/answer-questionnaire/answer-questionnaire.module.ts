import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { AnswerQuestionnaireRoutingModule } from './answer-questionnaire-routing.module';
import { AnswerQuestionnaireComponent } from './answer-questionnaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AnswerQuestionnaireComponent
  ],
  imports: [
    CommonModule,
    AnswerQuestionnaireRoutingModule,
    ReactiveFormsModule
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    StudentService
  ]
})
export class AnswerQuestionnaireModule { }
