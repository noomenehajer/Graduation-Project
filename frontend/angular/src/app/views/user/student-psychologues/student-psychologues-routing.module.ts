import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPsychologuesComponent } from './list-psychologues/list-psychologues.component';
import { DetailPsyComponent } from '../../admin/psy/detail-psy/detail-psy.component';

const routes: Routes = [
  {path:'',component:ListPsychologuesComponent},
  {path:'detail',component:DetailPsyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPsychologuesRoutingModule { }
