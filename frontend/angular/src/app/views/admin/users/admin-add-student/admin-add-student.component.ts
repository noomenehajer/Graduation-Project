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

  constructor(private studentService: StudentService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.studentService.addStudent(this.newStudent)
      .subscribe(
        (student: Student) => {
          console.log('Student added:', student);
          this.router.navigate(['/admin/users']);
          // Clear the form
          this.newStudent = {
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
