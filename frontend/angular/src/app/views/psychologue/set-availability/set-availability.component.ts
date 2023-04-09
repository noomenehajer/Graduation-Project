import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import interactionPlugin from '@fullcalendar/interaction'; // add this line
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-set-availability',
  templateUrl: './set-availability.component.html',
  styleUrls: ['./set-availability.component.css']
})
export class SetAvailabilityComponent {
  constructor(private disponibiliteService: DisponibiliteService) {
  }



  psyId: string | null = localStorage.getItem('psyId');
  jour!: string;
  debut!: string;
  fin!: string;

  onSubmit() {
    if (this.psyId !== null) {
    this.disponibiliteService.definirDisponibilite(this.psyId, this.jour, this.debut, this.fin)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }}
}
