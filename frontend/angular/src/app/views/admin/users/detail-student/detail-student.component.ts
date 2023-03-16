import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../../../../models/Student';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

  student!: Student;
  estSuspendu!: boolean;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private studentService: StudentService ,private http: HttpClient,private router: Router) {


  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getStudent();
    }
  }

  getStudent(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.studentService.getStudent(id).subscribe((data) => {
        this.student = data;
      });
  }
}
toggleSuspendAccount(id: string): void {
  if (!this.student.estSuspendu) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to suspend this account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, suspend it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.toggleSuspendAccount(id).subscribe(
          student => {
            this.student = student;
            Swal.fire(
              'Suspended!',
              'The account has been suspended.',
              'success'
            );
            this.errorMessage = '';
          },
          error => {
            Swal.fire(
              'Error!',
              'An error has occurred while suspending the account.',
              'error'
            );
            this.errorMessage = error;
          }
        );
      }
    });
  } else {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to reactivate this account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reactivate it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.toggleSuspendAccount(id).subscribe(
          student => {
            this.student = student;
            Swal.fire(
              'Reactivated!',
              'The account has been reactivated.',
              'success'
            );
            this.errorMessage = '';
          },
          error => {
            Swal.fire(
              'Error!',
              'An error has occurred while reactivating the account.',
              'error'
            );
            this.errorMessage = error;
          }
        );
      }
    });
  }
}




}
