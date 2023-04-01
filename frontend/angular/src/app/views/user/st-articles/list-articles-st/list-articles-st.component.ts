import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-articles-st',
  templateUrl: './list-articles-st.component.html',
  styleUrls: ['./list-articles-st.component.css']
})
export class ListArticlesStComponent implements OnInit{
  Articles: Article[]=[];
  editMode: boolean = false;
  constructor(private articleService: ArticleService,private authService:AuthService,    private router: Router    ) { }

  ngOnInit(): void {

    this.articleService.getAllArticles().subscribe(data => {
      this.Articles=data;

    });
   

}
shortenText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  const shortened = text.substr(0, maxChars);
  return `${shortened.substr(0, shortened.lastIndexOf(' '))}...`;
}

getAllArticles(): void {
  this.articleService.getAllArticles()
    .subscribe(
      (Articles: Article[])=>{
        this.Articles=Articles;
      },
      (error) => {
        console.log(error);
      }

      );
}






}
