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

  }

  checkAuthenticationStatus() {
    if (this.authService.isAuthenticated()) {
      this.verifyuser = true;
    } else {
      this.verifyuser = false;
    }

    if (this.authService.isAuthenticatedPsy()) {
      this.verifypsy = true;
    } else {
      this.verifypsy = false;
    }
  }

  ngOnInit() {
    this.checkAuthenticationStatus();
    window.addEventListener('storage', () => {
      this.checkAuthenticationStatus(); // Update authentication status when storage changes
    });

    this.articleService.getAllArticles().subscribe((articles: Article[]) => {
      this.articles = articles;
    });
  }
  logoutUser() {
    this.authService.logoutUser().subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/loginuser']);      },
      (error) => {
        console.log(error);
      }
    );
  }


  logoutPsy() {
    this.authService.logoutPsy().subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('token');
        localStorage.removeItem('psyId');
        localStorage.removeItem('psy');
        this.router.navigate(['/auth/loginPsy']);},
      (error) => {
        console.log(error);
      }
    );
  }
}
