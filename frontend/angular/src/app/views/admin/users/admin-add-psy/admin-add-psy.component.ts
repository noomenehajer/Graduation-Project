import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';

@Component({
  selector: 'app-admin-add-psy',
  templateUrl: './admin-add-psy.component.html',
  styleUrls: ['./admin-add-psy.component.css']
})
export class AdminAddPsyComponent implements OnInit{
  newPsychologue: Psychologue = {
    _id:'',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    estSuspendu:false,
    estValide:true,
  };
  errorMessage: string = '';

  constructor(private psyService: PsyService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.psyService.addPsychologue(this.newPsychologue)
      .subscribe(
        (psychologue: Psychologue) => {
          console.log('Psychologue added:', psychologue);
          this.router.navigate(['/admin/users/list-psy']);
          // Clear the form
          this.newPsychologue = {
            _id:'',
            nom: '',
            prenom: '',
            email: '',
            motDePasse: '',
            estSuspendu:false,
            estValide:true,
          };
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
  }

}
