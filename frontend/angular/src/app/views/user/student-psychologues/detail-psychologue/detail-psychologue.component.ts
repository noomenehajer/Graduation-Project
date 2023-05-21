import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Psychologue } from 'src/app/models/Psychologue';
import { Disponibilite } from 'src/app/models/disponibilite';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { PsyService } from 'src/app/services/psy.service';
import Swal from 'sweetalert2';
import { DemandezRvComponent } from '../demandez-rv/demandez-rv.component';
import { Rendezvous } from 'src/app/models/rendezvous';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-detail-psychologue',
  templateUrl: './detail-psychologue.component.html',
  styleUrls: ['./detail-psychologue.component.css']
})
export class DetailPsychologueComponent implements OnInit {
  etudiantId!: string;
rendezVous:any;
  psy!: Psychologue;
  disponibilities: Disponibilite[] = [];
  selected!: Date | null;
  availabilityShown = false;
  Rendezvous!:Rendezvous;
  buttonLabel = 'Demandez un Rendez vous';
  reservationDisponibiliteId: string | null = null;


  constructor(private route: ActivatedRoute, private psyService: PsyService,public disponibiliteService: DisponibiliteService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getPsy()
    const psyId = this.route.snapshot.paramMap.get('id');
    console.log(psyId)
    if (psyId !== null) {
    this.getDisponibilite(psyId);
    }
  }


  openDialog(disponibiliteId: string) {
    const dialogRef = this.dialog.open(DemandezRvComponent, {
      data: { disponibiliteId: disponibiliteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'success') {
    //     this.buttonLabel = 'Annuler';
    //   }
    // });
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




    annulerRv(disponibiliteId: string): void {
      const etudiantId = localStorage.getItem('userId');
      console.log(etudiantId + ' ' + disponibiliteId);
      if (disponibiliteId && etudiantId !== null) {
        this.reservationDisponibiliteId = disponibiliteId; // Assign the clicked disponibiliteId to reservationDisponibiliteId
        this.disponibiliteService.annulerRendezVous(etudiantId, this.reservationDisponibiliteId).subscribe(
          () => {
            // this.isReservationMade;
            this.buttonLabel = 'Demandez un Rendez vous';
            console.log('Rendez-vous annulé avec succès');
          },
          (error) => {
            console.error('Erreur lors de l\'annulation du rendez-vous:', error);
          }
        );
      }
    }





  getDisponibilite(psyId: string): void {

    this.disponibiliteService.getDisponibiliteByPsyId(psyId).subscribe(
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
            seance: seances,
            deleted: false
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

  // getRendezVousByDisponibilite(disponibiliteId: string) {
  //   return this.disponibiliteService.getRendezVousByDisponibilite(disponibiliteId);
  // }


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

  // deleteDisponibilite(disponibilite: any) {
  //   // Find the index of the disponibilite to delete
  //   const index = this.disponibilities.indexOf(disponibilite);

  //   // Show confirmation dialog
  //   Swal.fire({
  //     title: 'Are you sure you want to delete this availability?',
  //     text: 'This action cannot be undone.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#dc3545',
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {
  //     // If user confirms deletion
  //     if (result.isConfirmed) {
  //       // Remove the disponibilite from the array
  //       if (index !== -1) {
  //         this.disponibilities.splice(index, 1);
  //       }
  //       // Show success message
  //       Swal.fire({
  //         title: 'Availability deleted',
  //         icon: 'success'
  //       });
  //     }
  //   });
  // }


}

