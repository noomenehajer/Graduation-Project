import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendrierRoutingModule } from './calendrier-routing.module';
import { SetAvailabilityComponent } from '../set-availability/set-availability.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendrierRoutingModule,
  ],
  // entryComponents: [SetAvailabilityComponent],
})
export class CalendrierModule { }
