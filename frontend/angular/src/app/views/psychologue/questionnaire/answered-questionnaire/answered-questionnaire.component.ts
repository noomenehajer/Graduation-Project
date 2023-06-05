import { Student, Answer,QuestionAnswer } from './../../../../models/Student';
import { Questionnaire,Question } from './../../../../models/questionnaire';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answered-questionnaire',
  templateUrl: './answered-questionnaire.component.html',
  styleUrls: ['./answered-questionnaire.component.css']
})
export class AnsweredQuestionnaireComponent implements OnInit {
  studentId!: string;
  answers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['studentId'];
      this.getAnswersByStudentId();
    });
  }

  getAnswersByStudentId(): void {
    this.questionnaireService.getAnswersByStudentId(this.studentId)
      .subscribe(
        (response) => {
          this.answers = response.answers.map((answer: Answer) => {
            return {
              questionnaire: answer.questionnaire.title,
              answers: answer.answers.map((qa: QuestionAnswer) => {
                return {
                  question: qa.question,
                  answer: qa.answer
                };
              })
            };
          });
        },
        (error) => {
          console.error(error);
        }
      );
  }

 
}