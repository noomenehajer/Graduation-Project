import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddPsyComponent } from './admin-add-psy/admin-add-psy.component';
import { AdminListPsyComponent } from './admin-list-psy/admin-list-psy.component';
import { DetailPsyComponent } from './detail-psy/detail-psy.component';
import { EditPsyComponent } from './edit-psy/edit-psy.component';
import { PsyNonValideComponent } from './psy-non-valide/psy-non-valide.component';

const routes: Routes = [
  {path:'add',component:AdminAddPsyComponent},
  {path:'',component:AdminListPsyComponent},
  {path:'detail-psy/:id',component:DetailPsyComponent},
  {path:'edit/:id',component:EditPsyComponent},
  {path:'invalidPsy',component:PsyNonValideComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsyRoutingModule { }
