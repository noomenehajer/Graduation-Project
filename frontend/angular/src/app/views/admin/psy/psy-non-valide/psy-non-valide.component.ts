import { Component, OnInit } from '@angular/core';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-psy-non-valide',
  templateUrl: './psy-non-valide.component.html',
  styleUrls: ['./psy-non-valide.component.css']
})
export class PsyNonValideComponent implements OnInit {
  psychologues: Psychologue[] = [];
  pagedPsychologues: Psychologue[] = [];
  errorMessage!: string;
  pageSizeOptions: number[] = [5, 10, 20];
  currentPageSize: number = this.pageSizeOptions[0];
  currentPageIndex: number = 0;

  constructor(private psyService: PsyService) {}

  ngOnInit(): void {
    this.getNonValidPsy();
  }

  getNonValidPsy() {
    this.psyService.getNonValidPsy().subscribe(
      (data: Psychologue[]) => {
        this.psychologues = data;
        this.updatePagedPsychologues();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  validatePsy(psy: Psychologue) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        psy.estValide = true;
        this.psyService.editPsychologue(psy._id, psy).subscribe(
          () => {
            console.log('Psychologist validated:', psy);
            this.psychologues = this.psychologues.filter((s) => s._id !== psy._id);
            this.updatePagedPsychologues();
          },
          (error: any) => {
            console.error(error);
            this.errorMessage = error.message;
          }
        );
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.updatePagedPsychologues();
  }

  updatePagedPsychologues() {
    const startIndex = this.currentPageIndex * this.currentPageSize;
    const endIndex = startIndex + this.currentPageSize;
    this.pagedPsychologues = this.psychologues.slice(startIndex, endIndex);
  }
}
