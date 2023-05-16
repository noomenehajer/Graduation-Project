import { Component, OnInit , Input, TemplateRef, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModalRef,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rendezvous } from 'src/app/models/rendezvous';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { DetailRVComponent } from '../detail-rv/detail-rv.component';

@Component({
  selector: 'app-list-rendez-vous',
  templateUrl: './list-rendez-vous.component.html',
  styleUrls: ['./list-rendez-vous.component.css'],
})
export class ListRendezVousComponent implements OnInit {
  @Input() selectedDate: Date | null = null;
  @ViewChild('rendezvousModal') rendezvousModal!: TemplateRef<any>;

  rendezvousList: Rendezvous[] = [];
  filteredRendezvousList: Rendezvous[] = [];
  selected!: Date | null;
  modalRef: NgbModalRef | undefined;
  constructor(private disponibiliteService: DisponibiliteService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const psyId = localStorage.getItem('psyId');

    if (psyId !== null) {
      this.retrieveRendezvous(psyId);
    }
  }
  getRendezvousForSelectedDate(selectedDate: Date | null): void {
    if (!selectedDate) {
      this.filteredRendezvousList = [];
      return;
    }
    const selectedDateString = selectedDate.toDateString();
    // console.log('Selected Date:', selectedDateString);

    this.filteredRendezvousList = this.rendezvousList.filter((rendezvous) => {
      return rendezvous.disponibilite.seance.some((seance) => {
        const seanceDate = new Date(seance.jour);
        const seanceDateString = seanceDate.toDateString();
        // console.log('Seance Date:', seanceDateString);
        return seanceDateString === selectedDateString;
      });
    });
  }

  openDialog(rendezvousId: string) {
    const dialogRef = this.dialog.open(DetailRVComponent, {
      data: rendezvousId // Pass rendezvousId as data to the dialog component
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }



  retrieveRendezvous(psyId: string): void {
    this.disponibiliteService.getRvpsy(psyId).subscribe(
      (data) => {
        console.log('Received rendezvous data:', data);
        this.rendezvousList = data.filter(
          (rendezvous) => rendezvous.disponibilite.psy === psyId
        );
        console.log('Updated rendezvous list:', this.rendezvousList);
      },
      (error) => {
        console.error('Error retrieving rendezvous:', error);
      }
    );
  }

}
