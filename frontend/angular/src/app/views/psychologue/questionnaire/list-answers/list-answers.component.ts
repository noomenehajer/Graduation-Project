import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { Questionnaire } from 'src/app/models/questionnaire';
import { Student } from 'src/app/models/Student';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-answers',
  templateUrl: './list-answers.component.html',
  styleUrls: ['./list-answers.component.css']
})


export class ListAnswersComponent {
  students!: Student[];
}
