import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rendezvous } from 'src/app/models/rendezvous';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-list-rv',
  templateUrl: './list-rv.component.html',
  styleUrls: ['./list-rv.component.css']
})
export class ListRvComponent implements OnInit {
  @Input() selectedDate: Date | null = null;

  rendezvousId!: string;
  rendezvousList: Rendezvous[] = [];
  filteredRendezvousList: Rendezvous[] = [];
  filteredRendezvousListConfirme: Rendezvous[] = [];

  selected!: Date | null;
  // modalRef: NgbModalRef | undefined;

  constructor(private disponibiliteService: DisponibiliteService,private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    const etudiantId = localStorage.getItem('userId');

    const psyId = this.route.snapshot.paramMap.get('id');
    console.log(psyId)
    if (etudiantId !== null ) {
      this.retrieveRendezvous(etudiantId);
    }
  }

  getRendezvousForSelectedDate(selectedDate: Date | null): void {
    if (!selectedDate) {
      this.filteredRendezvousList = [];
      return;
    }

    const selectedDateString = selectedDate.toDateString();

    this.filteredRendezvousList = this.rendezvousList.filter((rendezvous) => {
      return rendezvous.status === 'confirme' && rendezvous.disponibilite.seance.some((seance) => {
        const seanceDate = new Date(seance.jour);
        const seanceDateString = seanceDate.toDateString();
        return seanceDateString === selectedDateString;
      });
    });

    console.log('Filtered rendezvous list:', this.filteredRendezvousList);
  }



  retrieveRendezvous(etudiantId: string): void {
    const psyId = this.route.snapshot.paramMap.get('id');
    this.disponibiliteService.getRvStudent(etudiantId).subscribe(
      (data) => {
        console.log('Received rendezvous data:', data);
        this.rendezvousList = data.filter((rendezvous) => rendezvous.etudiant._id === etudiantId && rendezvous.disponibilite.psy === psyId);
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
