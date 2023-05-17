import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendrierComponent } from './calendrier.component';
import { AuthPsyGuard } from '../../guards/auth-psy.guard';
import { SetAvailabilityComponent } from '../set-availability/set-availability.component';
import { DetailRVComponent } from '../detail-rv/detail-rv.component';

const routes: Routes = [
  {path:'',component:CalendrierComponent,canActivate:[AuthPsyGuard]},
  {path:'detail/:id',component:DetailRVComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule { }
