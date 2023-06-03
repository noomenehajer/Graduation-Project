import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-list-students',
  templateUrl: './admin-list-students.component.html',
  styleUrls: ['./admin-list-students.component.css']
})
export class AdminListStudentsComponent implements OnInit, AfterViewInit {
  Students: Student[] = [];
  pagedStudents: Student[] = [];
  errorMessage!: string;
  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'email'];
  pageSizeOptions: number[] = [2, 10, 20];
  currentPageSize: number = this.pageSizeOptions[0];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.updatePagedStudents();
    });
  }

  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (Students: Student[]) => {
        this.Students = Students;
        this.updatePagedStudents();
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }
    );
  }

  updatePagedStudents(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedStudents = this.Students.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPageSize = event.pageSize;
    this.updatePagedStudents();
  }

  onDeleteStudent(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe(
          () => {
            this.Students = this.Students.filter(a => a._id !== id);
            this.updatePagedStudents();
            Swal.fire(
              'Deleted!',
              'The student has been deleted.',
              'success'
            );
          },
          error => {
            console.log(error);
            Swal.fire(
              'Error!',
              'There was an error deleting the student.',
              'error'
            );
          }
        );
      }
    });
  }
}

