import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsyRoutingModule } from './psy-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminAddPsyComponent } from './admin-add-psy/admin-add-psy.component';
import { AdminListPsyComponent } from './admin-list-psy/admin-list-psy.component';
import { EditPsyComponent } from './edit-psy/edit-psy.component';
import { DetailPsyComponent } from './detail-psy/detail-psy.component';


@NgModule({
  declarations: [
    AdminAddPsyComponent,
    AdminListPsyComponent,
    EditPsyComponent,
    DetailPsyComponent
  ],
  imports: [
    CommonModule,
    PsyRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatToolbarModule
  ]
})
export class PsyModule { }
