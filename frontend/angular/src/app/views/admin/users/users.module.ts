import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdminAddPsyComponent } from './admin-add-psy/admin-add-psy.component';
import { AdminAddStudentComponent } from './admin-add-student/admin-add-student.component';
import { AdminListStudentsComponent } from './admin-list-students/admin-list-students.component';
import { AdminListPsyComponent } from './admin-list-psy/admin-list-psy.component';


@NgModule({
  declarations: [

    AdminAddPsyComponent,
    AdminAddStudentComponent,
    AdminListStudentsComponent,
    AdminListPsyComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
