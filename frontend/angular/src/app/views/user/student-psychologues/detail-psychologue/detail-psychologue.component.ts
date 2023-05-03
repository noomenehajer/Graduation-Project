import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Psychologue } from 'src/app/models/Psychologue';
import { Disponibilite } from 'src/app/models/disponibilite';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { PsyService } from 'src/app/services/psy.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail-psychologue',
  templateUrl: './detail-psychologue.component.html',
  styleUrls: ['./detail-psychologue.component.css']
})
export class DetailPsychologueComponent implements OnInit {

  psy!: Psychologue;
  disponibilities: Disponibilite[] = [];
  selected!: Date | null;
  availabilityShown = false;
  constructor(private route: ActivatedRoute, private psyService: PsyService,private disponibiliteService: DisponibiliteService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getPsy()
    const psyId = this.route.snapshot.paramMap.get('id');
    console.log(psyId)
    if (psyId !== null) {
    this.getDisponibilite(psyId);
    }
  }

  getPsy(): void {
    const psyId = this.route.snapshot.paramMap.get('id');

    if (psyId !== null) {
      this.psyService.getPsychologue(psyId).subscribe((data) => {
        this.psy= data;
      });
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




  hideAvailability(): void {
    this.selected = null;
    this.availabilityShown = false;
  }
  deleteDisponibilite(disponibilite: any) {
    // Find the index of the disponibilite to delete
    const index = this.disponibilities.indexOf(disponibilite);

    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure you want to delete this availability?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      // If user confirms deletion
      if (result.isConfirmed) {
        // Remove the disponibilite from the array
        if (index !== -1) {
          this.disponibilities.splice(index, 1);
        }
        // Show success message
        Swal.fire({
          title: 'Availability deleted',
          icon: 'success'
        });
      }
    });
  }


}

