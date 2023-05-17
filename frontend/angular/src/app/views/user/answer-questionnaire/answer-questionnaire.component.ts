import { Component, OnInit } from '@angular/core';
import { Questionnaire ,Question, Option} from 'src/app/models/questionnaire';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/Student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-answer-questionnaire',
  templateUrl: './answer-questionnaire.component.html',
  styleUrls: ['./answer-questionnaire.component.css']
})
export class AnswerQuestionnaireComponent implements OnInit {
  questionnaireId!: string;
  questionnaire!: Questionnaire ;
  questionnaireForm!: FormGroup;
  isSubmitted = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private questionnaireService: StudentService
  ) { }

  ngOnInit(): void {
    this.questionnaireForm = new FormGroup({});
    this.questionnaireId = this.route.snapshot.paramMap.get('id')!;
          this.questionnaireService.getPublishedQuestionnaireById(this.questionnaireId)
        .subscribe(
          questionnaire => {
            this.questionnaire = questionnaire;
            this.createForm();
          },
          error => this.errorMessage = error
        );
      }

  createForm(): void {
    const formControls: { [key: string]: any } = {};
    for (const question of this.questionnaire.questions) {
      const validators = [];
      if (question.type === 'text' || question.type === 'paragraph') {
        validators.push(Validators.required);
      }
      formControls[question._id] = ['', validators];
    }
    this.questionnaireForm = this.formBuilder.group(formControls);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.questionnaireForm.invalid) {
      return;
    }
    const answers: { questionId: string, text: string }[] = [];
    for (const question of this.questionnaire.questions) {
      const answer = {
        questionId: question._id,
        text: this.questionnaireForm.get(question._id)?.value
      };
      if (question.type === 'checkbox' || question.type === 'multiplechoice') {
        answer.text = answer.text.join(';');
      }
      answers.push(answer);
    }
    this.questionnaireService.submitAnswers(this.questionnaire._id, answers)
      .subscribe(
        () => this.isSubmitted = false,
        error => this.errorMessage = error
      );
  }

}