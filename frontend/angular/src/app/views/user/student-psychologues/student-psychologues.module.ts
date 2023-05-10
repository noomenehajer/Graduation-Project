import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { StudentPsychologuesRoutingModule } from './student-psychologues-routing.module';
import { ListPsychologuesComponent } from './list-psychologues/list-psychologues.component';
import { DetailPsychologueComponent } from './detail-psychologue/detail-psychologue.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { DemandezRvComponent } from './demandez-rv/demandez-rv.component';

@NgModule({
  declarations: [
    ListPsychologuesComponent,
    DetailPsychologueComponent,
    DemandezRvComponent
  ],
  imports: [MatFormFieldModule,
    MatTabsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    StudentPsychologuesRoutingModule
  ]
})
export class StudentPsychologuesModule { }
