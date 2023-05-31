import { Component, OnInit } from '@angular/core';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';

@Component({
  selector: 'app-list-psychologues',
  templateUrl: './list-psychologues.component.html',
  styleUrls: ['./list-psychologues.component.css']
})
export class ListPsychologuesComponent implements OnInit {
  Psychologues: Psychologue[] = [];
  filteredPsychologues: Psychologue[] = [];
  searchText: string = '';

  constructor(private psyService: PsyService) { }

  ngOnInit(): void {
    this.getAllPsychologues();
  }

  getAllPsychologues(): void {
    this.psyService.getAllPsychologues().subscribe(
      (Psychologues: Psychologue[]) => {
        this.Psychologues = Psychologues;
        this.filteredPsychologues = Psychologues;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitSearch(): void {
    this.filteredPsychologues = this.Psychologues.filter((psychologue: Psychologue) => {
      const fullName = `${psychologue.nom} ${psychologue.prenom}`;
      return fullName.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }

  shortenText(text: string, maxChars: number): string {
    if (text.length <= maxChars) {
      return text;
    }
    const shortened = text.substr(0, maxChars);
    return `${shortened.substr(0, shortened.lastIndexOf(' '))}...`;
  }
}
