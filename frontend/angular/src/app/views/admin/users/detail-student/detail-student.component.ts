import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

  student!: Student;

  constructor(private route: ActivatedRoute, private studentService: StudentService ,private http: HttpClient) {


  }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.studentService.getStudent(id).subscribe((data) => {
        this.student = data;
      });
  }
}

}
