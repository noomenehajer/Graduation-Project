import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {
  questionnaires: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/questionnaires').subscribe(questionnaires => {
      this.questionnaires = questionnaires;
    });
  }

  deleteQuestionnaire(id: string) {
    this.http.delete(`http://localhost:3000/questionnaires/${id}`).subscribe(() => {
      this.questionnaires = this.questionnaires.filter(q => q._id !== id);
    });
  }
}
