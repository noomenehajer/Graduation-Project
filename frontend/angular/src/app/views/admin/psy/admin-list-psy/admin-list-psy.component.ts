import { Component, OnInit } from '@angular/core';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-list-psy',
  templateUrl: './admin-list-psy.component.html',
  styleUrls: ['./admin-list-psy.component.css']
})
export class AdminListPsyComponent implements OnInit {
  Psychologues: Psychologue[] = [];
  pagedPsychologues: Psychologue[] = [];
  errorMessage!: string;
  pageSizeOptions: number[] = [2, 10, 20];
  currentPageSize: number = this.pageSizeOptions[0];
  currentPageIndex: number = 0;

  constructor(private psyService: PsyService) {}

  ngOnInit(): void {
    this.getAllPsychologues();
  }

  getAllPsychologues(): void {
    this.psyService.getAllPsychologues().subscribe(
      (Psychologues: Psychologue[]) => {
        this.Psychologues = Psychologues;
        this.updatePagedPsychologues();
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'An error occurred while fetching psychologists.';
      }
    );
  }

  updatePagedPsychologues(): void {
    const startIndex = this.currentPageIndex * this.currentPageSize;
    const endIndex = startIndex + this.currentPageSize;
    this.pagedPsychologues = this.Psychologues.slice(startIndex, endIndex);
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
            this.Psychologues = this.Psychologues.filter((a) => a._id !== id);
            this.updatePagedPsychologues();
            Swal.fire('Deleted!', 'The psychologist has been deleted.', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'An error occurred while deleting the psychologist.', 'error');
          }
        );
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.updatePagedPsychologues();
  }
}
