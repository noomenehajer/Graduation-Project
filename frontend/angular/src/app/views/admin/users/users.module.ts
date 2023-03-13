import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { AdminAddPsyComponent } from './admin-add-psy/admin-add-psy.component';
import { AdminAddStudentComponent } from './admin-add-student/admin-add-student.component';
import { AdminListStudentsComponent } from './admin-list-students/admin-list-students.component';
import { AdminListPsyComponent } from './admin-list-psy/admin-list-psy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { DetailPsyComponent } from './detail-psy/detail-psy.component';


@NgModule({
  declarations: [
    AdminAddPsyComponent,
    AdminAddStudentComponent,
    AdminListStudentsComponent,
    AdminListPsyComponent,
    DetailStudentComponent,
    DetailPsyComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
      FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
