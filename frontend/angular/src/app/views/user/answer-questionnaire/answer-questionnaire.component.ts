import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StudentService } from 'src/app/services/student.service';
import { Questionnaire, Question, Option } from 'src/app/models/questionnaire';

@Component({
  selector: 'app-answer-questionnaire',
  templateUrl: './answer-questionnaire.component.html',
  styleUrls: ['./answer-questionnaire.component.css']
})
export class AnswerQuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup;
  questionnaire!: Questionnaire;
  errorMessage!: string;
  successMessage!: string;
  options!: Option[];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.questionnaireForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const questionnaireId = params['id'];
      this.getQuestionnaire(questionnaireId);
    });
  }

  getQuestionnaire(questionnaireId: string): void {
    this.studentService.getPublishedQuestionnaireById(questionnaireId).subscribe(
      (questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        this.buildForm();
      },
      (error: any) => {
        this.errorMessage = error.message;
      }
    );
  }

  buildForm(): void {
    for (const question of this.questionnaire.questions) {
      const formControl = new FormControl('');
      this.questionnaireForm.addControl(question._id, formControl);
    }
  }
 
  onSubmit(): void {
    const answers = this.questionnaire.questions.map((question: Question) => {
      const formControl = this.questionnaireForm.get(question._id);
      let selectedOptions: string[] = [];

      if (question.type === 'checkboxes') {
        for (const option of question.options) {
        // Check if the checkbox is selected
          if (formControl?.value) {
            selectedOptions.push(option._id);
          }
           
      }
     } else if (question.type === 'multiplechoice') {
        const option = question.options.find((o: Option) => o.text === formControl?.value);
        if (option) {
          selectedOptions.push(option._id);
        }
      }
  
      return {
        questionId: question._id,
        text: formControl?.value,
        selectedOptions: selectedOptions
      };
    });
  
    this.studentService.submitAnswers(this.questionnaire._id, answers).subscribe(
      () => {
        this.successMessage = 'Answers submitted successfully';
        this.router.navigate(['/quiz']);
      },
      (error: any) => {
        this.errorMessage = error.message;
      }
    );
  }
  
}
