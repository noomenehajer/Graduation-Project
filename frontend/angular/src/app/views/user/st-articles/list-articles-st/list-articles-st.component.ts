import { Component } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-articles-st',
  templateUrl: './list-articles-st.component.html',
  styleUrls: ['./list-articles-st.component.css']
})
export class ListArticlesStComponent {
  Articles: Article[]=[];
  editMode: boolean = false;
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

    this.articleService.getAllArticles().subscribe(data => {
      this.Articles=data;

    })


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
