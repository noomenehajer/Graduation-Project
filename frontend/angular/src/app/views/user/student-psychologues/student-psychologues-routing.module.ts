import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPsychologuesComponent } from './list-psychologues/list-psychologues.component';
import { DetailPsychologueComponent } from './detail-psychologue/detail-psychologue.component';
import { AuthPsyGuard } from '../../guards/auth-psy.guard';

const routes: Routes = [
  {path:'',component:ListPsychologuesComponent},
  {path:'psy/detail/:id',component:DetailPsychologueComponent,canActivate:[]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPsychologuesRoutingModule { }
