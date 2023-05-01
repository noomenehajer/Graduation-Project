import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import interactionPlugin from '@fullcalendar/interaction'; // add this line
import dayGridPlugin from '@fullcalendar/daygrid';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-availability',
  templateUrl: './set-availability.component.html',
  styleUrls: ['./set-availability.component.css']
})
export class SetAvailabilityComponent {
  psyId: string | null = localStorage.getItem('psyId');
  jour!: Date;
  debut!: Date;
  fin!: Date;

  constructor(private disponibiliteService: DisponibiliteService,private router: Router,public dialogRef: MatDialogRef<SetAvailabilityComponent>,) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.psyId !== null) {
      // Format the date input to match the backend format
      const jour = new Date(this.jour);
      jour.setHours(0, 0, 0, 0);

      // Format the time inputs to match the backend format
      const debut = new Date(`2000-01-01T${this.debut}:00.000Z`);
      const fin = new Date(`2000-01-01T${this.fin}:00.000Z`);
   
      // Call the definirDisponibilite function with the formatted inputs
      this.disponibiliteService.definirDisponibilite(this.psyId, jour, debut, fin).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close();
          Swal.fire({
            title: 'Success!',
            text: 'Your availability has been set.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {


              // Redirect to the calendar route
              this.router.navigate(['/calendar']);

            }
          });
        },
        (error) => console.log(error)
      );
    }
  }
}
