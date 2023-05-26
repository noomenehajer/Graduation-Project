import { Psychologue } from './../../../models/Psychologue';
import { Student } from './../../../models/Student';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { PsyService } from 'src/app/services/psy.service';
import { StudentService } from 'src/app/services/student.service'; 
import { Component } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  articles: Article[] = [];
  psychologues:Psychologue[]=[];
  students:Student[]=[];
  firstYearPercentage: number = 0;
  secondYearPercentage: number = 0;
  thirdYearPercentage: number = 0;
  constructor(private articleService: ArticleService,private psychologueService:PsyService,private studentService:StudentService) { }
  ngOnInit() {    
    this.articleService.getAllArticles().subscribe((articles: Article[]) => {
      this.articles = articles;
    });
    this.psychologueService.getAllPsychologues().subscribe((psychologues: Psychologue[]) => {
      this.psychologues = psychologues;
    });
    this.studentService.getAllStudents().subscribe((students: Student[]) => {
      this.students = students;
      this.calculateGradeLevelPercentages();
    });
  }
  calculateGradeLevelPercentages() {
    const totalStudents = this.students.length;
    const firstYearCount = this.students.filter(
      (student) => student.niveau === '1st year'
    ).length;
    const secondYearCount = this.students.filter(
      (student) => student.niveau === '2nd year'
    ).length;
    const thirdYearCount = this.students.filter(
      (student) => student.niveau === '3rd year'
    ).length;

    this.firstYearPercentage = (firstYearCount / totalStudents) * 100;
    this.secondYearPercentage = (secondYearCount / totalStudents) * 100;
    this.thirdYearPercentage = (thirdYearCount / totalStudents) * 100;
  }
}
