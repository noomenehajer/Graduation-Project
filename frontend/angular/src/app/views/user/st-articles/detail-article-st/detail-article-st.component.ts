import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { Reply } from 'src/app/models/reply';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-article-st',
  templateUrl: './detail-article-st.component.html',
  styleUrls: ['./detail-article-st.component.css']
})
export class DetailArticleStComponent implements OnInit {
  article!: Article;
  replies: Reply[] = [];
  replyContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    // this.replyContent = '';
  }

  ngOnInit(): void {

    this.getArticle();
    this.getReplies();
  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.articleService.getArticle(id).subscribe((data) => {
        this.article = data;
      });
    }
  }

  createReply(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const etudiant = this.authService.getUserData();
    if (!etudiant) {
      Swal.fire({
        title: 'You must log in to reply to an article',
        icon: 'warning',
        showCancelButton: true, // add this line to show cancel button
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel' // add this line to set cancel button text
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/auth/loginuser']);
        }
      });

      return;
    }

    if (id !== null) {
      const reply: Reply = {
        content: this.replyContent,
        student: {
          _id: etudiant._id,
          nom: etudiant.nom,
          prenom: etudiant.prenom
        }
      };

      this.articleService.createReply(id, reply).subscribe((newReply) => {
        reply.student._id = etudiant._id;
        reply.student.nom=etudiant.nom;
        reply.student.prenom=etudiant.prenom;
        this.replies.push(newReply);
        this.replyContent = '';
      });
    }
  }


  getReplies(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.articleService.getReplies(id).subscribe((data) => {
        this.replies = data;
      });
    }
  }
}
