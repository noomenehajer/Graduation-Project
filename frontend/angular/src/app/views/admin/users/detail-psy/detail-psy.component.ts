import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Psychologue } from 'src/app/models/Psychologue';
import { PsyService } from 'src/app/services/psy.service';

@Component({
  selector: 'app-detail-psy',
  templateUrl: './detail-psy.component.html',
  styleUrls: ['./detail-psy.component.css']
})
export class DetailPsyComponent {

  psychologue!: Psychologue;

  constructor(private route: ActivatedRoute, private psyService: PsyService ,private http: HttpClient) {


  }

  ngOnInit(): void {
    this.getPsychologue();
  }

  getPsychologue(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.psyService.getPsychologue(id).subscribe((data) => {
        this.psychologue = data;
      });
  }
}

}
