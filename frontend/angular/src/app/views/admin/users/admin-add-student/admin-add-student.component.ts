import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-admin-add-student',
  templateUrl: './admin-add-student.component.html',
  styleUrls: ['./admin-add-student.component.css']
})
export class AdminAddStudentComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  studentForm: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', Validators.required),
  });

  newStudent: Student = {
    _id:'',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    estSuspendu:false,
    estValide:true,
  };
  errorMessage: string = '';

  constructor(private studentService: StudentService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nomCtrl: ['', Validators.required],
      prenomCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.newStudent.nom = this.studentForm.value.nom;
    this.newStudent.prenom = this.studentForm.value.prenom;
    this.newStudent.email = this.studentForm.value.email;
    this.newStudent.motDePasse = this.studentForm.value.motDePasse;

    this.studentService.addStudent(this.newStudent)
      .subscribe(
        (student: Student) => {
          console.log('Student added:', student);
          this.router.navigate(['/admin/users']);
          this.newStudent = {
            _id:'',
            nom: '',
            prenom: '',
            email: '',
            motDePasse: '',
            estSuspendu:false,
            estValide:true,
          };
          this.studentForm.reset();
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
  }

  onReset() {
    this.newStudent = {
      _id:'',
      nom: '',
      prenom: '',
      email: '',
      motDePasse: '',
      estSuspendu:false,
      estValide:true,
    };
    this.studentForm.reset();
  }
}
