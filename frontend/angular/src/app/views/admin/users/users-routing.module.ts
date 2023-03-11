import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddPsyComponent } from './admin-add-psy/admin-add-psy.component';
import { AdminAddStudentComponent } from './admin-add-student/admin-add-student.component';
import { AdminListPsyComponent } from './admin-list-psy/admin-list-psy.component';
import { AdminListStudentsComponent } from './admin-list-students/admin-list-students.component';

const routes: Routes = [
  {path:'add-psy',component:AdminAddPsyComponent},
  {path:'add-student',component:AdminAddStudentComponent},
  {path:'',component:AdminListStudentsComponent},
  {path:'list-psy',component:AdminListPsyComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
