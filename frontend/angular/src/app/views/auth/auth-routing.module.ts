import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { LoginuserComponent } from './loginuser/loginuser.component';

const routes: Routes = [
{path:'loginadmin',component:LoginadminComponent},
{path:'loginuser',component:LoginuserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
