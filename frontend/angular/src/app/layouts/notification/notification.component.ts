import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  notifications: any[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }


  // redirectToHome() {
  //   this.router.navigate(['/home']);
  // }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (notifications: any[]) => {
        this.notifications = notifications;
      },
      (error) => {
        console.log(error);
        // Handle error here, e.g. show an error message to the user
      }
    );
  }

  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      // Update the notification status in the local array
      const notification = this.notifications.find(n => n._id === notificationId);
      notification.read = true;
    });
  }

}
