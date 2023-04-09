import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPsychologuesRoutingModule } from './student-psychologues-routing.module';
import { ListPsychologuesComponent } from './list-psychologues/list-psychologues.component';


@NgModule({
  declarations: [
    ListPsychologuesComponent
  ],
  imports: [
    CommonModule,
    StudentPsychologuesRoutingModule
  ]
})
export class StudentPsychologuesModule { }
