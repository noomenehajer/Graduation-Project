import { Component, OnInit } from '@angular/core';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';

@Component({
  selector: 'app-list-psychologues',
  templateUrl: './list-psychologues.component.html',
  styleUrls: ['./list-psychologues.component.css']
})
export class ListPsychologuesComponent implements OnInit{
  Psychologues: Psychologue[]=[];
  // editMode: boolean = false;

  constructor(private psyService: PsyService) { }

  ngOnInit(): void {

    this.psyService.getAllPsychologues().subscribe(data => {
      this.Psychologues=data;

    })


}
shortenText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  const shortened = text.substr(0, maxChars);
  return `${shortened.substr(0, shortened.lastIndexOf(' '))}...`;
}

getAllPsychologues(): void {
  this.psyService.getAllPsychologues()
    .subscribe(
      (Psychologues: Psychologue[])=>{
        this.Psychologues=Psychologues;
      },
      (error) => {
        console.log(error);
      }

      );
}
}
