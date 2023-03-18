import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { SignupUserComponent } from './signup-user/signup-user.component';

const routes: Routes = [
{path:'loginadmin',component:LoginadminComponent},
{path:'loginuser',component:LoginuserComponent},
{path:'signup',component:SignupUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
