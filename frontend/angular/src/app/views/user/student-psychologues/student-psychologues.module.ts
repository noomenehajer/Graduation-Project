import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPsychologuesRoutingModule } from './student-psychologues-routing.module';
import { ListPsychologuesComponent } from './list-psychologues/list-psychologues.component';
import { DetailPsychologueComponent } from './detail-psychologue/detail-psychologue.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ListPsychologuesComponent,
    DetailPsychologueComponent
  ],
  imports: [
    MatTabsModule,
    CommonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    StudentPsychologuesRoutingModule
  ]
})
export class StudentPsychologuesModule { }
