import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StArticlesRoutingModule } from './st-articles-routing.module';
import { ListArticlesStComponent } from './list-articles-st/list-articles-st.component';
import { DetailArticleStComponent } from './detail-article-st/detail-article-st.component';


@NgModule({
  declarations: [
    ListArticlesStComponent,
    DetailArticleStComponent
  ],
  imports: [
    CommonModule,
    StArticlesRoutingModule
  ]
})
export class StArticlesModule { }
