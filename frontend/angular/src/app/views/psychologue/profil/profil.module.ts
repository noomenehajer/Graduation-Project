import { AuthPsyGuard } from './../../guards/auth-psy.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PsyService } from './../../../services/psy.service';


@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthPsyGuard,
    AuthService,
    PsyService
  ]
})
export class ProfilModule { }
