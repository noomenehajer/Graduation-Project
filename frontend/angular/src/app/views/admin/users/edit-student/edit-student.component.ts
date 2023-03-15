import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit{
  student!: Student;
  errorMessage!: string;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id=""
    // const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(
        (student: Student) => {
          this.student = student;
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
  }

  updateStudent(): void {
    this.studentService.editStudent(this.student._id, this.student)
      .subscribe(
        (updatedStudent: Student) => {
          console.log('Student updated:', updatedStudent);
          this.router.navigate(['/admin/students']);
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
  }

  



}
