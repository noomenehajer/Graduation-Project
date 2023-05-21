import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { Disponibilite } from 'src/app/models/disponibilite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventInput } from '@fullcalendar/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';

import { SetAvailabilityComponent } from '../set-availability/set-availability.component';
import { ListRendezVousComponent } from '../list-rendez-vous/list-rendez-vous.component';
import { RvConfirmeeComponent } from '../rv-confirmee/rv-confirmee.component';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']

})
export class CalendrierComponent implements OnInit {

  @ViewChild(ListRendezVousComponent)
  set listRendezVousComponentInstance(component: ListRendezVousComponent) {
    this.listRendezVousComponent = component;
  }
  @ViewChild(RvConfirmeeComponent)
  set RvConfirmeeInstance(component: RvConfirmeeComponent) {
    this.RvConfirmeeComponent = component;
  }
  listRendezVousComponent!: ListRendezVousComponent;
  RvConfirmeeComponent!:RvConfirmeeComponent;
  psyId = localStorage.getItem('psyId');
  disponibilities: Disponibilite[] = [];
  selected!: Date | null;
  availabilityShown = false;

  constructor(private disponibiliteService: DisponibiliteService,public dialog: MatDialog) { }
  ngOnInit(): void {
    const psyId = localStorage.getItem('psyId');
    if (psyId) {
      this.getDisponibilite(psyId);
    }

  }

  showAvailabilityWithDate(selected: Date): void {
    this.selected = selected;
    this.availabilityShown = true;
  }

  showAvailability(selected: Date | null): void {
    if (selected !== null) {
      this.showAvailabilityWithDate(selected);
    } else {
      this.hideAvailability();
    }
  }

  // deleteDisponibiliteById(disponibiliteId: string): void {
  //   const index = this.disponibilities.findIndex(disponibilite => disponibilite._id === disponibiliteId);
  //   if (index !== -1) {
  //     try {

  //       this.disponibilities.splice(index, 1);
  //       console.log('Disponibilite deleted successfully');
  //     } catch (error) {
  //       console.error('Error deleting disponibilite:', error);
  //     }
  //   } else {
  //     console.error('Disponibilite not found:', disponibiliteId);
  //   }
  // }

  // getDisponibilite(psyId: string): void {
  //   this.disponibiliteService.getDisponibilite().subscribe(
  //     (disponibilites: Disponibilite[]) => {
  //       const updatedDisponibilites = disponibilites.filter(disponibilite =>
  //         this.disponibilities.findIndex(d => d._id === disponibilite._id) === -1
  //       );

  //       this.disponibilities = updatedDisponibilites.map(disponibilite => {
  //         const seances = disponibilite.seance.map(seance => {
  //           return {
  //             jour: new Date(seance.jour),
  //             debut: new Date(seance.debut),
  //             fin: new Date(seance.fin)
  //           };
  //         });
  //         return {
  //           _id: disponibilite._id,
  //           psy: disponibilite.psy,
  //           seance: seances
  //         };
  //       });
  //     },
  //     error => console.log(error)
  //   );
  // }
  getDisponibilite(psyId: string): void {
    this.disponibiliteService.getDisponibilite().subscribe(
      (disponibilites: Disponibilite[]) => {
        const nonDeletedDisponibilites = disponibilites.filter(disponibilite => !disponibilite.deleted);
        this.disponibilities = nonDeletedDisponibilites.map(disponibilite => {
          const seances = disponibilite.seance.map(seance => {
            return {
              jour: new Date(seance.jour),
              debut: new Date(seance.debut),
              fin: new Date(seance.fin)
            };
          });
          return {
            _id: disponibilite._id,
            psy: disponibilite.psy,
            seance: seances,
            deleted:false
          };
        });

        // Store the non-deleted disponibilities in local storage
        localStorage.setItem('nonDeletedDisponibilites', JSON.stringify(nonDeletedDisponibilites));
      },
      error => console.log(error)
    );
  }
  deleteDisponibiliteById(disponibiliteId: string): void {
    const index = this.disponibilities.findIndex(disponibilite => disponibilite._id === disponibiliteId);
    if (index !== -1) {
      try {
        this.disponibilities.splice(index, 1);
        console.log('Disponibilite deleted successfully');
      } catch (error) {
        console.error('Error deleting disponibilite:', error);
      }
    } else {
      console.error('Disponibilite not found:', disponibiliteId);
    }
  }


  getDisponibilitesForSelectedDate(): Disponibilite[] {
    if (!this.selected) {
      return [];
    }
    return this.disponibilities.filter(disponibilite => {
      return disponibilite.seance.some(seance => {
      this.sortDisponibilites();

        return seance.jour.toDateString() === this.selected?.toDateString();
      });
    });
  }
  sortDisponibilites() {
    this.disponibilities.sort((a, b) => {
      const debutA = new Date(a.seance[0].debut);
      const debutB = new Date(b.seance[0].debut);
      return debutA.getTime() - debutB.getTime();
    });
  }
  isOnSelectedDate(date: Date): boolean {
    return this.selected ? this.selected.toDateString() === date.toDateString() : false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(SetAvailabilityComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  showRendezvous(selectedDate: Date | null): void {
    this.listRendezVousComponent.getRendezvousForSelectedDate(selectedDate);
  }

  showRendezvousConfirme(selectedDate: Date | null): void {
    this.RvConfirmeeComponent.getRendezvousConfirmeForSelectedDate(selectedDate);
  }
  hideAvailability(): void {
    this.selected = null;
    this.availabilityShown = false;
  }



  deleteDisponibilite(disponibiliteId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this disponibilite!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.disponibiliteService.deleteDisponibilite(disponibiliteId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Your disponibilite has been deleted.',
              'success'
            );
            if(this.psyId){

              this.getDisponibilite(this.psyId);
            }
          },
          error => {
            console.log(error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting your disponibilite.',
              'error'
            );
          }
        );
      }
    });
  }

}
