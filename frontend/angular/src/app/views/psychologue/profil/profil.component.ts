import { Psychologue } from './../../../models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  psy: any;
  editForm!: FormGroup;
  changePasswordForm!: FormGroup;
  selectedFile!: File;
  imageUrl!: string;
  isChangingPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private psyService: PsyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      adresse: [''],
      specialite: [''],
      description: ['']
    });

    this.changePasswordForm = this.formBuilder.group({
      ancienMotDePasse: [''],
      nouveauMotDePasse: ['']
    });

    this.psyService.getProfile().subscribe(
      res => {
        this.psy = res.psy;
        this.editForm.patchValue({
          nom: this.psy.nom,
          prenom: this.psy.prenom,
          email: this.psy.email,
          telephone: this.psy.telephone,
          adresse: this.psy.adresse,
          specialite: this.psy.specialite,
          description: this.psy.description
        });
        this.imageUrl = this.psy.photo;
      },
      err => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files![0];
 
  }
  onSubmitEditForm(): void {
    const formData = new FormData();
    formData.append('nom', this.editForm.get('nom')?.value);
    formData.append('prenom', this.editForm.get('prenom')?.value);
    formData.append('email', this.editForm.get('email')?.value);
    formData.append('telephone', this.editForm.get('telephone')?.value);
    formData.append('adresse', this.editForm.get('adresse')?.value);
    formData.append('specialite', this.editForm.get('specialite')?.value);
    formData.append('description', this.editForm.get('description')?.value);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }
    this.psyService.updateProfile(formData).subscribe(
      res => {
        this.psy = res;
        this.imageUrl = res.imageUrl;
        alert('Update successful.');
      },
      err => {
        console.log(err);
        alert('Update failed. Please try again later.');
      }
    );
  }

  onSubmitChangePasswordForm(): void {
    this.psyService.changePassword(this.changePasswordForm.value.ancienMotDePasse, this.changePasswordForm.value.nouveauMotDePasse).subscribe(
      res => {
        console.log(res);
        this.isChangingPassword = false;
        alert('Update successful.');
        this.changePasswordForm.reset();
      },
      err => {
        console.log(err);
        alert('Update failed. Please try again later.');
      }
    );
  }
}