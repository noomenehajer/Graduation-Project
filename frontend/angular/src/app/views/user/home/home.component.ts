import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}
  onGetStartedClick(): void {
    this.router.navigate(['/auth/signup']);
  }
  onGetLoginClick(): void {
    this.router.navigate(['/auth/loginuser']);
  }







}
