import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PsyService } from '../../../../services/psy.service';
import { Psychologue } from '../../../../models/Psychologue';

@Component({
  selector: 'app-admin-add-psy',
  templateUrl: './admin-add-psy.component.html',
  styleUrls: ['./admin-add-psy.component.css']
})
export class AdminAddPsyComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  psyForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private psyService: PsyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomCtrl: ['', Validators.required],
      prenomCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required]
    });
    this.psyForm = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      motDePasse: ['', Validators.required],
      estSuspendu: [false],
      estValide: [true]
    });
  }

  onSubmit(): void {
    const newPsychologue: Psychologue = {
      _id: '',
      nom: this.psyForm.value.nom,
      prenom: this.psyForm.value.prenom,
      email: this.psyForm.value.email,
      motDePasse: this.psyForm.value.motDePasse,
      estSuspendu: this.psyForm.value.estSuspendu,
      estValide: this.psyForm.value.estValide,
    };
    this.psyService.addPsychologue(newPsychologue)
      .subscribe(
        (psychologue: Psychologue) => {
          console.log('Psychologue added:', psychologue);
          this.router.navigate(['/admin/psy']);
          // Clear the form
          this.psyForm.reset({
            nom: '',
            prenom: '',
            email: '',
            motDePasse: '',
            estSuspendu: false,
            estValide: true
          });
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
  }

}
