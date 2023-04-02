import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Questionnaire } from 'src/app/models/questionnaire';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
@Component({
  selector: 'app-list-questionnaire',
  templateUrl: './list-questionnaire.component.html',
  styleUrls: ['./list-questionnaire.component.css']
})
export class ListQuestionnaireComponent implements OnInit {

  questionnaires!: Questionnaire[];

  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.questionnaireService.getQuestionnaires().subscribe(
      questionnaires => this.questionnaires = questionnaires
    );
  }

  onAdd(): void {
    this.router.navigate(['/psy/questionnaire/add']);
  }

  onDelete(questionnaire: Questionnaire): void {
    if (confirm('Are you sure you want to delete this questionnaire?')) {
      this.questionnaireService.deleteQuestionnaire(questionnaire._id!).subscribe(() => {
        this.questionnaires = this.questionnaires.filter(q => q !== questionnaire);
      });
    }
  }

}
