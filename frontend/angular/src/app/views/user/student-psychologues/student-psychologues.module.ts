import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPsychologuesRoutingModule } from './student-psychologues-routing.module';
import { ListPsychologuesComponent } from './list-psychologues/list-psychologues.component';
import { DetailPsychologueComponent } from './detail-psychologue/detail-psychologue.component';


@NgModule({
  declarations: [
    ListPsychologuesComponent,
    DetailPsychologueComponent
  ],
  imports: [
    CommonModule,
    StudentPsychologuesRoutingModule
  ]
})
export class StudentPsychologuesModule { }
