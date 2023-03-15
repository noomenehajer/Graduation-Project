import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { AdminAddPsyComponent } from '../psy/admin-add-psy/admin-add-psy.component';
import { AdminAddStudentComponent } from './admin-add-student/admin-add-student.component';
import { AdminListStudentsComponent } from './admin-list-students/admin-list-students.component';
import { AdminListPsyComponent } from '../psy/admin-list-psy/admin-list-psy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { DetailPsyComponent } from '../psy/detail-psy/detail-psy.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { NonValidStudentComponent } from './non-valid-student/non-valid-student.component';
import { MatCommonModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AdminAddPsyComponent,
    AdminAddStudentComponent,
    AdminListStudentsComponent,
    AdminListPsyComponent,
    DetailStudentComponent,
    DetailPsyComponent,
    EditStudentComponent,
    NonValidStudentComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
      FormsModule,
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
export class UsersModule { }
