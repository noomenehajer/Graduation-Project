
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
import { UsersModule } from './views/admin/users/users.module';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { QuestionnaireComponent } from './views/admin/questionnaire/questionnaire.component';
import { AdminPasswordComponent } from './views/admin/admin-password/admin-password.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WhoAreYouComponent,
    QuestionnaireComponent,
    AdminPasswordComponent

  ],
  imports: [
    BrowserModule,
    MatCommonModule,
    AppRoutingModule,
    FormsModule,
    LayoutsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    ArticleModule,
    UsersModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatStepperModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
