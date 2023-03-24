import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule} from './auth-routing.module'
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignupPsyComponent } from './signup-psy/signup-psy.component';
import { LoginPsyComponent } from './login-psy/login-psy.component';
@NgModule({
  declarations: [
    LoginadminComponent,
    SignupAdminComponent,
    LoginuserComponent,
    SignupUserComponent,
    SignupPsyComponent,
    LoginPsyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule




  ]
})
export class AuthModule { }
