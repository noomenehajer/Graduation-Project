import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-admin-list-students',
  templateUrl: './admin-list-students.component.html',
  styleUrls: ['./admin-list-students.component.css']
})
export class AdminListStudentsComponent implements OnInit{
  Students: Student[]=[];
  // editMode: boolean = false;
  errorMessage!: string;
  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'email'];
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {

    this.studentService.getAllStudents().subscribe(data => {
      this.Students=data;

    })


}
shortenText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  const shortened = text.substr(0, maxChars);
  return `${shortened.substr(0, shortened.lastIndexOf(' '))}...`;
}

getAllStudents(): void {
  this.studentService.getAllStudents()
    .subscribe(
      (Students: Student[])=>{
        this.Students=Students;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }

      );
}


}


