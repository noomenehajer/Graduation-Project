import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { Questionnaire } from 'src/app/models/questionnaire';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-list-answers',
  templateUrl: './list-answers.component.html',
  styleUrls: ['./list-answers.component.css']
})


export class ListAnswersComponent implements OnInit{
  students: Student[] = [];
  questionnaireId!: string;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private QuestionnaireService:QuestionnaireService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.questionnaireId = params['id'];
      this.getAnsweredStudents(this.questionnaireId);
    });
  }

  getAnsweredStudents(questionnaireId: string): void {
    this.QuestionnaireService.getAnsweredByStudentIDs(questionnaireId).subscribe(
      (response: any) => {
        const answeredByStudentIDs = response.answeredBy;
        this.getStudents(answeredByStudentIDs);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getStudents(studentIds: string[]): void {
    studentIds.forEach((studentId: string) => {
      this.studentService.getStudent(studentId).subscribe(
        (student: Student) => {
          this.students.push(student);
        },
        (error: any) => {
          console.error(error);
        }
      );
    });
  }
}