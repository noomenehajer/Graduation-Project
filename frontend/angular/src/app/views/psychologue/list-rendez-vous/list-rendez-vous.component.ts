import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/Student';
import { Disponibilite } from 'src/app/models/disponibilite';
import { Rendezvous } from 'src/app/models/rendezvous';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';

@Component({
  selector: 'app-list-rendez-vous',
  templateUrl: './list-rendez-vous.component.html',
  styleUrls: ['./list-rendez-vous.component.css']
})
export class ListRendezVousComponent implements OnInit {
  rendezVous!: Rendezvous[];
  Student!: Student[];
  Disponibilite!: Disponibilite[];
  constructor(private disponibiliteService: DisponibiliteService) { }

  ngOnInit(): void {
    this.loadRv();
  }


  loadRv() {
    this.disponibiliteService.getRvpsy().subscribe(
      data => {
        this.rendezVous = data;
        console.log(data);
      },
      error => console.log(error)
    );
  }


}
