import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  calendarOptions!: CalendarOptions;

  constructor(private availabilityService: DisponibiliteService) { }

  ngOnInit() {
    this.loadAvailabilityData();
  }

  loadAvailabilityData() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      views: {
        timeGridWeek: {
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
          slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: true },
          slotDuration: '00:15',
          buttonText: 'Week'
        }
      },
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      events: (info, successCallback, failureCallback) => {
        this.availabilityService.getDisponibilite('psyId123').subscribe({
          next: (disponibilites: any[]) => {
            const events = disponibilites.map(disponibilite => {
              const date = new Date(disponibilite.seance.jour);
              const start = new Date(`${disponibilite.seance.jour}T${disponibilite.seance.debut}`);
              const end = new Date(`${disponibilite.seance.jour}T${disponibilite.seance.fin}`);

              return {
                title: 'Disponible',
                start,
                end,
                allDay: false
              };
            });

            successCallback(events);
          },
          error: (error) => {
            failureCallback(error);
          }
        });
      }
    };
  }

  // This method can be called whenever you need to update the calendar with new availability data
  updateAvailabilityData() {
    this.loadAvailabilityData();
  }
}
