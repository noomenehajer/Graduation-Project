import { Component, OnInit } from '@angular/core';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-list-psy',
  templateUrl: './admin-list-psy.component.html',
  styleUrls: ['./admin-list-psy.component.css']
})
export class AdminListPsyComponent implements OnInit{
  Psychologues: Psychologue[]=[];
  // editMode: boolean = false;

  constructor(private psyService: PsyService) { }

  ngOnInit(): void {

    this.psyService.getAllPsychologues().subscribe(data => {
      this.Psychologues=data;

    })


}
shortenText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  const shortened = text.substr(0, maxChars);
  return `${shortened.substr(0, shortened.lastIndexOf(' '))}...`;
}

getAllPsychologues(): void {
  this.psyService.getAllPsychologues()
    .subscribe(
      (Psychologues: Psychologue[])=>{
        this.Psychologues=Psychologues;
      },
      (error) => {
        console.log(error);
      }

      );
}

onDeletePsy(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this psychologist!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.psyService.deletePsy(id).subscribe(
        () => {
          this.Psychologues = this.Psychologues.filter(a => a._id !== id);
          Swal.fire('Deleted!', 'The psychologist has been deleted.', 'success');
        },
        error => {
          console.log(error);
          Swal.fire('Error', 'An error occurred while deleting the psychologist.', 'error');
        }
      );
    }
  });
}


}
