import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthStGuard } from '../../guards/auth-st.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthStGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
