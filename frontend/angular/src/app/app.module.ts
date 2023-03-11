
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { AuthModule } from './views/auth/auth.module';
import { WhoAreYouComponent } from './views/who-are-you/who-are-you.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ArticleModule } from './views/admin/article/article.module';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WhoAreYouComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LayoutsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ArticleModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
