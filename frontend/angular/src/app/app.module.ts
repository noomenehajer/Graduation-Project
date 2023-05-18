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
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { AdminPasswordComponent } from './views/admin/admin-password/admin-password.component';
import { StArticlesModule } from './views/user/st-articles/st-articles.module';
import { AuthGuard } from './views/guards/auth.guard';
import { AuthService } from './services/auth.service';
import { QuestionnaireModule } from './views/psychologue/questionnaire/questionnaire.module';
import { ArticleService } from './services/article.service';
import { CalendrierComponent } from './views/psychologue/calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SetAvailabilityComponent } from './views/psychologue/set-availability/set-availability.component';
import { ProfilModule } from './views/psychologue/profil/profil.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { ListRendezVousComponent } from './views/psychologue/list-rendez-vous/list-rendez-vous.component';
import { DetailRVComponent } from './views/psychologue/detail-rv/detail-rv.component';
import { RvConfirmeeComponent } from './views/psychologue/rv-confirmee/rv-confirmee.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WhoAreYouComponent,
    AdminPasswordComponent,
    CalendrierComponent,
    SetAvailabilityComponent,
    ListRendezVousComponent,
    DetailRVComponent,
    RvConfirmeeComponent,


  ],
  imports: [


    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
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
    MatStepperModule,
    MatCardModule,
    MatIconModule,
    QuestionnaireModule,
    ProfilModule

  ],
  providers: [AuthGuard,AuthService,ArticleService],
  bootstrap: [AppComponent],

})
export class AppModule { }

