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
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']

})
export class CalendrierComponent implements OnInit {
  // @ViewChild('modalContent') modalContent!: SetAvailabilityComponent;
 psyId = localStorage.getItem('psyId');
  disponibilities: Disponibilite[] = [];
  calendarOptions!: CalendarOptions;
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

  getDisponibilite(psyId: string): void {
    // psyId!=localStorage.getItem('psyId');
    this.disponibiliteService.getDisponibilite().subscribe(
      (disponibilites: Disponibilite[]) => {
        this.disponibilities = disponibilites.map(disponibilite => {
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
            seance: seances
          };
        });
      },
      error => console.log(error)
    );
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