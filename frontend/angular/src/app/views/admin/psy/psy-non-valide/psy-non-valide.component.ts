import { Component ,OnInit} from '@angular/core';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-psy-non-valide',
  templateUrl: './psy-non-valide.component.html',
  styleUrls: ['./psy-non-valide.component.css']
})
export class PsyNonValideComponent implements OnInit{
  psychologues: Psychologue[]=[];
  errorMessage!:'';
  displayedColumns: string[] = ['_id', 'nom', 'prenom', 'email'];
  constructor(private psyService: PsyService) { }

  ngOnInit(): void {
    this.getNonValidPsy();
  }

  getNonValidPsy() {
    // console.log('hi')
    this.psyService.getNonValidPsy().subscribe(
      (data: Psychologue[]) => {
        this.psychologues = data;

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  validatePsy(psy: Psychologue) {

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir valider cet étudiant ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
    psy.estValide = true;
    this.psyService.editPsychologue(psy._id, psy).subscribe(
      () => {
        console.log('Student validated:', psy);
        this.psychologues = this.psychologues.filter((s) => s._id !== psy._id);
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.message;
      }
    );
  }
});
}

}
