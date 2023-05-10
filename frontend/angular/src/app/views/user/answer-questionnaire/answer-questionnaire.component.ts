 import { Component, OnInit } from '@angular/core';
import { Questionnaire ,Question} from 'src/app/models/questionnaire';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-answer-questionnaire',
  templateUrl: './answer-questionnaire.component.html',
  styleUrls: ['./answer-questionnaire.component.css']
})
export class AnswerQuestionnaireComponent{} /* implements OnInit {
  questionnaire!: Questionnaire;
  questions!: Question[];
  answers: { questionId: string, text: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    const questionnaireId = this.route.snapshot.paramMap.get('id')?? '';
    this.studentService.getPublishedQuestionnaireById(questionnaireId).subscribe(
    // student.publishedQuestions
  (questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        this.questions = questionnaire.questions;
      },
      error => {
        console.error(error);
      }
    );
  }
  
  onSubmitAnswers(): void {
    this.studentService.submitAnswers(this.questionnaire._id, this.answers).subscribe(
      () => {
        // handle successful submission appropriately, e.g., redirect to success page
      },
      error => {
        console.error(error);
        // handle error appropriately, e.g., display error message to user
      }
    );
  }
} */