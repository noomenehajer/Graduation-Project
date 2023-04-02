import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from 'src/app/models/questionnaire';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
@Component({
  selector: 'app-detail-questionnaire',
  templateUrl: './detail-questionnaire.component.html',
  styleUrls: ['./detail-questionnaire.component.css']
})
export class DetailQuestionnaireComponent implements OnInit {

  questionnaire!: Questionnaire;

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.questionnaireService.getQuestionnaireById(id).subscribe(
        questionnaire => this.questionnaire = questionnaire
      );
    }
  }
}