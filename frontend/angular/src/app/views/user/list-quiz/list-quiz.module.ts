import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { ListQuizRoutingModule } from './list-quiz-routing.module';
import { ListQuizComponent } from './list-quiz.component';


@NgModule({
  declarations: [
    ListQuizComponent
  ],
  imports: [
    CommonModule,
    ListQuizRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    StudentService
  ]
})
export class ListQuizModule { }
