import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil.component';
import { AuthPsyGuard } from '../../guards/auth-psy.guard';

const routes: Routes = [
  { path: '', component: ProfilComponent, canActivate: [AuthPsyGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
