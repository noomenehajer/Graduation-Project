import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPsychologuesComponent } from './list-psychologues/list-psychologues.component';

const routes: Routes = [
  {path:'',component:ListPsychologuesComponent},
  // {path:'detail/:id',component:DetailArticleStComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPsychologuesRoutingModule { }
