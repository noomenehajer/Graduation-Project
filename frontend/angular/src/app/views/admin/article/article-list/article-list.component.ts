import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{
  Articles: Article[]=[];
  editMode: boolean = false;
  pageSizeOptions: number[] = [5, 10, 20];
  pagedArticle: Article[] = [];
  currentPageSize: number = this.pageSizeOptions[0];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {

    this.articleService.getAllArticles().subscribe(data => {
      this.Articles=data;

    })


}
ngAfterViewInit(): void {
  this.paginator.page.subscribe(() => {
    this.updatePagedArticle();
  });
}

updatePagedArticle(): void {
  const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  const endIndex = startIndex + this.paginator.pageSize;
  this.pagedArticle = this.Articles.slice(startIndex, endIndex);
}

onPageChange(event: PageEvent): void {
  this.currentPageSize = event.pageSize;
  this.updatePagedArticle();
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
        this.updatePagedArticle();
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
