import { Component,Inject,Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Rendezvous } from 'src/app/models/rendezvous';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';

@Component({
  selector: 'app-detail-rv',
  templateUrl: './detail-rv.component.html',
  styleUrls: ['./detail-rv.component.css']
})
export class DetailRVComponent implements OnInit {
  rendezvous!: Rendezvous;

  constructor(private route: ActivatedRoute, private disponibiliteService: DisponibiliteService , @Inject(MAT_DIALOG_DATA) public data: { rendezvousId: string }) {


  }

  ngOnInit(): void {
    this.getRendezvous(this.data.rendezvousId); // Retrieve rendezvous details based on the rendezvousId
  }

  // closeModal(): void {
  //   this.dialogRef.close();
  // }

  getRendezvous(rendezvousId: string): void {

    this.disponibiliteService.getRvpsyById(rendezvousId).subscribe(
      (rendezvous: Rendezvous[]) => {
        if (rendezvous.length > 0) {
          this.rendezvous = rendezvous[0];
          console.log('Rendezvous details:', this.rendezvous);
        } else {
          console.log('Rendezvous not found');
        }
      },
      (error) => {
        console.error('Failed to retrieve rendezvous:', error);
      }
    );
  }
}
