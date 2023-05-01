import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
  articles: Article[] = [];
  verifyuser:any;
  verifypsy:any
  constructor(private articleService: ArticleService,private authService:AuthService,private router:Router) {
  if(this.authService.isAuthenticated()==true ){
    this.verifyuser=true;
  }else{
    this.verifyuser=false;
  }
  if(this.authService.isAuthenticatedPsy()==true){
    this.verifypsy=true;
  }else{
    this.verifypsy=false;
  }


  }

  ngOnInit() {
    this.articleService.getAllArticles().subscribe((articles: Article[]) => {
      this.articles = articles;
    });
  }
  logoutUser() {
    this.authService.logoutUser().subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('token');
        this.router.navigate(['/auth/loginuser']);      },
      (error) => {
        console.log(error);
      }
    );
  }
}
