import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserLayoutComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class LayoutsModule { }
