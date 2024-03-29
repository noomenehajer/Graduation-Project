import { Component, OnInit , Input, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgbModalRef,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rendezvous } from 'src/app/models/rendezvous';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { DetailRVComponent } from '../detail-rv/detail-rv.component';
import Swal from 'sweetalert2';
import { CalendrierComponent } from '../calendrier/calendrier.component';

@Component({
  selector: 'app-list-rendez-vous',
  templateUrl: './list-rendez-vous.component.html',
  styleUrls: ['./list-rendez-vous.component.css'],
})
export class ListRendezVousComponent implements OnInit {
  @Input() selectedDate: Date | null = null;
  @ViewChild('rendezvousModal') rendezvousModal!: TemplateRef<any>;
  // @ViewChild(CalendrierComponent)
  // calendrierComponentInstance!: CalendrierComponent;
  @Output() rendezvousAccepted = new EventEmitter<string>();

  rendezvousId!: string;
  rendezvousList: Rendezvous[] = [];
  filteredRendezvousList: Rendezvous[] = [];
  filteredRendezvousListConfirme: Rendezvous[] = [];

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

    this.filteredRendezvousList = this.rendezvousList.filter((rendezvous) => {
      return rendezvous.status === 'demande' && rendezvous.disponibilite.seance.some((seance) => {
        const seanceDate = new Date(seance.jour);
        const seanceDateString = seanceDate.toDateString();
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
        this.rendezvousList = data.filter((rendezvous) => rendezvous.disponibilite.psy === psyId);
        console.log('Updated rendezvous list:', this.rendezvousList);
      },
      (error) => {
        console.error('Error retrieving rendezvous:', error);
      }
    );
  }

  acceptRendezvous(rendezvousId: string | undefined) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to accept this consultation?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed && rendezvousId) {
        this.disponibiliteService.acceptRendezvous(rendezvousId).subscribe(
          () => {
            const rendezvous = this.rendezvousList.find((r) => r._id === rendezvousId);
            if (rendezvous) {
              const disponibiliteId = rendezvous.disponibilite._id;

              // console.log('Deleting disponibiliteId:', disponibiliteId);

              // this.calendrierComponentInstance.deleteDisponibiliteById(disponibiliteId);
              this.rendezvousAccepted.emit(disponibiliteId);              // console.log('Disponibilite deleted successfully');
            }

            Swal.fire('Accepted!', 'Rendezvous accepted successfully', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Failed to accept rendezvous', 'error');
            console.error('Failed to accept rendezvous:', error);
            // Handle the error appropriately
          }
        );
      } else {
        console.error('Rendezvous ID is undefined');
      }
    });
  }


  refuseRendezvous(rendezvousId: string | undefined) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to refuse this consultation?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed && rendezvousId) { // Check if rendezvousId is defined
        this.disponibiliteService.refuseRendezvous(rendezvousId).subscribe(
          () => {
            Swal.fire('refused!', 'Consultation refused successfully', 'success');
            // Perform any additional actions after accepting the rendezvous
          },
          (error) => {
            Swal.fire('Error!', 'Failed to refuse consultation', 'error');
            console.error('Failed to refuse consultation:', error);
            // Handle the error appropriately
          }
        );
      } else {
        console.error('Rendezvous ID is undefined');
      }
    });
  }


}
