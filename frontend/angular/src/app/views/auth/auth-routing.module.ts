import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPsyComponent } from './login-psy/login-psy.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { SignupPsyComponent } from './signup-psy/signup-psy.component';
import { SignupUserComponent } from './signup-user/signup-user.component';

const routes: Routes = [
{path:'loginadmin',component:LoginadminComponent},
{path:'',component:LoginuserComponent},
{path:'loginPsy',component:LoginPsyComponent},
{path:'signup',component:SignupUserComponent},
{path:'signupPsy',component:SignupPsyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
