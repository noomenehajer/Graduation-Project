import { StudentService } from 'src/app/services/student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Student } from 'src/app/models/Student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  student!: Student;
  isEditing: boolean = false;
  isChangingPassword: boolean = false;
  imageFile: File | null = null;
  userId!: string; 
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private etudiantService: StudentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: [''],
      adresse: [''],
      niveau: [''],
      photo: [''],
      ancienMotDePasse: [''],
      nouveauMotDePasse: ['']
    });
    this.route.params.subscribe(params => {
      this.userId = params['id'] || this.authService.getUserData().id;
      this.getProfile();
    });
  }

  getProfile(): void {
    
    this.etudiantService.getProfile().subscribe(

      (response) => {
        this.student = response;
        this.profileForm.patchValue({
          nom: this.student.nom,
          prenom: this.student.prenom,
          telephone: this.student.telephone,
          adresse: this.student.adresse,
          niveau: this.student.niveau,
          photo: this.student.photo
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  editProfile(): void {
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
    const formData = new FormData();
    formData.append('nom', this.profileForm.value.nom);
    formData.append('prenom', this.profileForm.value.prenom);
    formData.append('telephone', this.profileForm.value.telephone);
    formData.append('adresse', this.profileForm.value.adresse);
    formData.append('niveau', this.profileForm.value.niveau);
    if (this.imageFile) {
      formData.append('photo', this.imageFile, this.imageFile.name);
    }
    this.etudiantService.editProfile(formData).subscribe(
      (response) => {
        this.student = response;
        this.isEditing = false;
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error(error);
        alert('Failed to update profile');
      }
    );
  }
  
  updatePassword(): void {
    const ancienMotDePasse = this.profileForm.get('ancienMotDePasse')?.value;
    const nouveauMotDePasse = this.profileForm.get('nouveauMotDePasse')?.value;
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
    this.etudiantService.updatePassword(ancienMotDePasse, nouveauMotDePasse).subscribe(
      (response) => {
        console.log(response);
        this.isChangingPassword = false;
        this.profileForm.reset();
        alert('Password updated successfully!');
      },
      (error) => {
        console.error(error);
        alert('Failed to update password');
      }
    );
  }
  onFileSelected(event: Event) {
    this.imageFile = (event.target as HTMLInputElement).files![0];
  /*   const fileNameElement = document.getElementById("file-name");
    if (fileNameElement) {
      fileNameElement.innerHTML = this.imageFile.name;
    } */
  }
  
  encryptData(): void {
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
    this.etudiantService.encryptData().subscribe(
      (response) => {
        console.log(response);
        this.getProfile();
        alert('Data encrypted successfully!');
      },
      (error) => {
        console.error(error);
        alert('Failed to encrypt data');
      }
    );
  }
  
  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
    if (this.profileForm.invalid) {
      return;
    }

    this.etudiantService.editProfile(this.profileForm.value)
      .subscribe(
        data => {
          this.student = data;
          alert('Profile updated successfully!');
        },
        error => {
          console.log(error);
          alert('Failed to update profile');
        });
  }
} 