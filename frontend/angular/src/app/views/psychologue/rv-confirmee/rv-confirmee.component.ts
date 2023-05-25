import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Rendezvous } from 'src/app/models/rendezvous';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { NgbModalRef,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rv-confirmee',
  templateUrl: './rv-confirmee.component.html',
  styleUrls: ['./rv-confirmee.component.css']
})
export class RvConfirmeeComponent {
  @Input() selectedDate: Date | null = null;
  @ViewChild('rendezvousModal') rendezvousModal!: TemplateRef<any>;
  rendezvousId!: string;
  rendezvousList: Rendezvous[] = [];
  filteredRendezvousListConfirme: Rendezvous[] = [];
  selected!: Date | null;
  modalRef: NgbModalRef | undefined;
  constructor(private disponibiliteService: DisponibiliteService, public dialog: MatDialog,private router:Router) {}

  ngOnInit(): void {
    const psyId = localStorage.getItem('psyId');

    if (psyId !== null) {
      this.retrieveRendezvous(psyId);
    }
  }
  getRendezvousConfirmeForSelectedDate(selectedDate: Date | null): void {
    if (!selectedDate) {
      this.filteredRendezvousListConfirme = [];
      return;
    }

    const selectedDateString = selectedDate.toDateString();

    this.filteredRendezvousListConfirme = this.rendezvousList.filter((rendezvous) => {
      return rendezvous.status === 'confirme' && rendezvous.disponibilite.seance.some((seance) => {
        const seanceDate = new Date(seance.jour);
        const seanceDateString = seanceDate.toDateString();
        return seanceDateString === selectedDateString;
      });
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


  createRoom() {
    const roomId = uuidv4();
    console.log('create room with roomId:', roomId);
    this.router.navigate(['/room', roomId]);
  }

}


