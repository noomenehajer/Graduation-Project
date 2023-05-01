import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendrierComponent } from './calendrier.component';
import { AuthPsyGuard } from '../../guards/auth-psy.guard';
import { SetAvailabilityComponent } from '../set-availability/set-availability.component';

const routes: Routes = [
  {path:'',component:CalendrierComponent,canActivate:[AuthPsyGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule { }
