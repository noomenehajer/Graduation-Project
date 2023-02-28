import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { AuthModule } from './views/auth/auth.module';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WhoAreYouComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    AppRoutingModule,
    AuthModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
