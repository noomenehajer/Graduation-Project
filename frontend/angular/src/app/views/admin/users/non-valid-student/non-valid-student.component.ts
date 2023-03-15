import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-non-valid-student',
  templateUrl: './non-valid-student.component.html',
  styleUrls: ['./non-valid-student.component.css']
})
export class NonValidStudentComponent implements OnInit{
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getNonValidStudents();
  }

  getNonValidStudents() {
    this.studentService.getNonValidStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  validateStudent(student: Student) {

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir valider cet étudiant ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
    student.estValide = true;
    this.studentService.editStudent(student._id, student).subscribe(
      () => {
        console.log('Student validated:', student);
        this.students = this.students.filter((s) => s._id !== student._id);
      },
      (error: any) => {
        console.error(error);
        // this.errorMessage = error.message;
      }
    );
  }
});
}

  // deleteStudent(student: Student) {
  //   this.studentService.deleteStudent(student._id).subscribe(
  //     () => {
  //       console.log('Student deleted:', student);
  //       this.students = this.students.filter((s) => s._id !== student._id);
  //     },
  //     (error: any) => {
  //       console.error(error);
  //       // this.errorMessage = error.message;
  //     }
  //   );
  // }


}

