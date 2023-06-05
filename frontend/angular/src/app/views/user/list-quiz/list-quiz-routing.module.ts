import { ListQuizComponent } from './list-quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthStGuard } from '../../guards/auth-st.guard';

const routes: Routes = [
  { path: '', component:ListQuizComponent , canActivate: [AuthStGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListQuizRoutingModule { }
