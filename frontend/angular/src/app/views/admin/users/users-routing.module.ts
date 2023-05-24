import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddStudentComponent } from './admin-add-student/admin-add-student.component';
import { AdminListStudentsComponent } from './admin-list-students/admin-list-students.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { NonValidStudentComponent } from './non-valid-student/non-valid-student.component';
import { AuthAdminGuard } from '../../guards/auth-admin.guard';

const routes: Routes = [
  {path:'add',component:AdminAddStudentComponent,canActivate:[AuthAdminGuard]},
  {path:'',component:AdminListStudentsComponent,canActivate:[AuthAdminGuard]},
  {path:'detail/:id',component:DetailStudentComponent,canActivate:[AuthAdminGuard]},
  {path:'edit/:id',component:EditStudentComponent,canActivate:[AuthAdminGuard]},
  {path:'nonvalid',component:NonValidStudentComponent,canActivate:[AuthAdminGuard]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
