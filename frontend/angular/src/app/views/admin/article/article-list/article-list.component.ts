import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/services/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{
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

onDeleteArticle(id: string) {
  if (confirm("Are you sure you want to delete this article?")) {
    this.articleService.deleteArticle(id).subscribe(
      () => {
        this.Articles = this.Articles.filter(a => a._id !== id);
      },
      error => {
        console.log(error);
      }
    );
  }
}


}
