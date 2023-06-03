import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-non-valid-student',
  templateUrl: './non-valid-student.component.html',
  styleUrls: ['./non-valid-student.component.css']
})
export class NonValidStudentComponent implements OnInit {
  students: Student[] = [];
  pagedStudents: Student[] = [];
  errorMessage!: string;
  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'email'];
  pageSizeOptions: number[] = [2, 10, 20];
  currentPageSize: number = this.pageSizeOptions[0];

  constructor(private studentService: StudentService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getNonValidStudents();
  }

  getNonValidStudents() {
    this.studentService.getNonValidStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
        this.updatePagedStudents();
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
            this.updatePagedStudents();
          },
          (error: any) => {
            console.error(error);
            this.errorMessage = error.message;
          }
        );
      }
    });
  }

  updatePagedStudents(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedStudents = this.students.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex; // Update the current page index
    this.updatePagedStudents();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.updatePagedStudents();
    });
  }
}

