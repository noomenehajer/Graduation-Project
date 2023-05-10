import { Component, Inject } from '@angular/core';
import { DisponibiliteService } from 'src/app/services/disponibilite.service';
import { MatFormFieldControl } from '@angular/material/form-field';

import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Rendezvous } from 'src/app/models/rendezvous';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-demandez-rv',
  templateUrl: './demandez-rv.component.html',
  styleUrls: ['./demandez-rv.component.css']
})
export class DemandezRvComponent {
  etudiantId: string | null = localStorage.getItem('userId');

  type!: string;
  commentaire!: string;


  constructor(private consultationService: DisponibiliteService,public dialogRef: MatDialogRef<DemandezRvComponent>,  @Inject(MAT_DIALOG_DATA) public data: { disponibiliteId: string},private router:Router) { }


  onSubmit() {
    if (this.etudiantId !== null) {
      this.consultationService.demanderRendezVous(
        this.etudiantId,
        this.data.disponibiliteId,
        this.type,
        this.commentaire
      ).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close();
          // this.isReservationMade ;

          Swal.fire({
            title: 'Success!',
            text: 'Your availability has been set.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/psychologues/psy/detail/:id']);
            }
          });
        },
        (error) => console.log(error)
      );
    }
  }


    }
