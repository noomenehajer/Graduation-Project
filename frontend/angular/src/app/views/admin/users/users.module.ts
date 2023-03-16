import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { AdminAddStudentComponent } from './admin-add-student/admin-add-student.component';
import { AdminListStudentsComponent } from './admin-list-students/admin-list-students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { NonValidStudentComponent } from './non-valid-student/non-valid-student.component';
import { MatCommonModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
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
    AdminAddStudentComponent,
    AdminListStudentsComponent,
    DetailStudentComponent,
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
