import { StudentService } from 'src/app/services/student.service';
import { Component, OnInit } from '@angular/core';
import { Questionnaire } from 'src/app/models/questionnaire';
import { AuthService } from 'src/app/services/auth.service';
import { Student,Answer,QuestionAnswer } from 'src/app/models/Student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  currentUser!: Student;
  questionnaires!: Questionnaire[];
  answeredQuestionnaires!: Questionnaire[];
  selectedQuestionnaire: Questionnaire | null = null;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUserData();
    this.studentService.getPublishedQuestionnaires().subscribe(
      (questionnaires: Questionnaire[]) => {
        this.questionnaires = questionnaires;
      },
      (error) => {
        console.log(error);
      }
    );

    this.studentService.getAnsweredQuestionnaires().subscribe(
      (answeredQuestionnaires: Questionnaire[]) => {
        this.answeredQuestionnaires = answeredQuestionnaires;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isQuestionnaireAnswered(questionnaire: Questionnaire): boolean {
    if (!questionnaire.answers || questionnaire.answers.length === 0) {
      return false;
    }
    const studentAnswers = questionnaire.answers.find((answer) => answer.student === this.currentUser._id);
    return !!studentAnswers;
  }

  showAnswers(questionnaire: Questionnaire) {
    this.selectedQuestionnaire = questionnaire;
  }
  getAnswerText(answer: any, questionId: string): string {
    const questionAnswer = answer.answers.find((qa: any) => qa.question === questionId);
    if (questionAnswer) {
      return questionAnswer.answer;
    }
    return '';
  }
}