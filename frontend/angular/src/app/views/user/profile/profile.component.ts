import { StudentService } from 'src/app/services/student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Student } from 'src/app/models/Student';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  profileForm!: FormGroup;
  student!: Student;
  isEditing: boolean = false;
  isEncrypting: boolean = false;
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
  
    this.getProfile();
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: [''],
      adresse: [''],
      niveau: [''],
      photo: ['']
    });
    this.userId = this.authService.getUserData().id; // get current user's ID
  }

  getProfile(): void {
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.etudiantService.getProfile(id, headers).subscribe(
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
     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const formData = new FormData();
    formData.append('nom', this.profileForm.value.nom);
    formData.append('prenom', this.profileForm.value.prenom);
    formData.append('telephone', this.profileForm.value.telephone);
    formData.append('adresse', this.profileForm.value.adresse);
    formData.append('niveau', this.profileForm.value.niveau);
    if (this.imageFile) {
      formData.append('photo', this.imageFile, this.imageFile.name);
    }
    this.etudiantService.editProfile(id, formData, headers).subscribe(
      (response) => {
        this.student = response;
        this.isEditing = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  updatePassword(): void {
    const ancienMotDePasse = this.profileForm.get('ancienMotDePasse')?.value;
    const nouveauMotDePasse = this.profileForm.get('nouveauMotDePasse')?.value;
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.etudiantService.updatePassword(id, ancienMotDePasse, nouveauMotDePasse, headers).subscribe(
      (response) => {
        console.log(response);
        this.isChangingPassword = false;
        this.profileForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onFileSelected(event: Event) {
    this.imageFile = (event.target as HTMLInputElement).files![0];
    document.getElementById("file-name")!.innerHTML = this.imageFile.name;
  }
  encryptData(): void {
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.etudiantService.encryptData(id, headers).subscribe(
      (response) => {
        console.log(response);
        this.isEncrypting = false;
        this.getProfile();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id') || this.userId;
     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if (this.profileForm.invalid) {
      return;
    }

    this.etudiantService.editProfile(id,this.profileForm.value,headers)
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