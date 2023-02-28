import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginadminComponent,
    SignupAdminComponent,
    LoginuserComponent,
    SignupUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    

  ]
})
export class AuthModule { }
