import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthStGuard } from '../../guards/auth-st.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { DetailArticleStComponent } from './detail-article-st/detail-article-st.component';
import { ListArticlesStComponent } from './list-articles-st/list-articles-st.component';

const routes: Routes = [
  {path:'',component:ListArticlesStComponent,canActivate:[AuthStGuard]},
  {path:'detail/:id',component:DetailArticleStComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StArticlesRoutingModule { }
