import { Component, HostListener, OnInit, OnChanges } from '@angular/core';
import { UserData } from 'src/app/registration/registration.component';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Notification } from 'src/app/services/notification.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  links = ['home', 'movies', 'collections', 'rateCollection', 'profile', 'ratings', `/friends`];
  public userData: UserData = {firstname: '', lastname: '', email: '', username: '', password: '', image: '', _id: ''};
  public isShownProfileMenu: boolean;
  user$: Observable<UserData>;
  private unlistener: () => void;
  public imageData?: string | ArrayBuffer;
  public notifications: Notification[];
  public notSeenNotifications: Notification[];
  public showNotRegistered: boolean;
  constructor(private store: Store<{user: UserData}>,
              private renderer: Renderer2, private router: Router,
              private notificationService: NotificationService) {
    this.user$ = store.select('user');
    this.notifications = [];
    this.user$.subscribe( user => {
      this.userData.username = user.username;
    });
    let parseUser;
    if (JSON.parse(localStorage.getItem('user'))){
      this.showNotRegistered = false;
      parseUser = JSON.parse(localStorage.getItem('user'));
      this.notificationService.getAllNotificationsByUserId(parseUser._id).subscribe(
        data => {
          this.notifications = (data as any).data;
          this.notSeenNotifications = (data as any).data.filter(note => note.seen === false);
        },
        //
      );
      this.userData.username = parseUser.username;
    }else{
      this.showNotRegistered = true;
    }
    if (parseUser && 'image' in parseUser){
      this.imageData = parseUser.image;
    }
    this.isShownProfileMenu = false;
  }

  ngOnInit(): void {
    this.unlistener = this.renderer.listen('document', 'click', event => {
      if (event.target.id !== 'profileText' && event.target.id !== 'arrowDown' && event.target.id !== 'arrowUp' &&
          event.target.id !== 'profileImage'){
        this.isShownProfileMenu = false;
      }
    });
  }

  ngOnChanges(): void{
    this.imageData = JSON.parse(localStorage.getItem('user')).image;
  }

  toggleProfileMenu(): void{
      this.isShownProfileMenu = !this.isShownProfileMenu;
  }

  returnRouterLink(notification: Notification): string {
     let res: string;
     if (notification.type === 'review'){
       res = '/movie/' + notification.movieId;
     }else if (notification.type === 'ranking'){
       res = '/ratings';
     }
     return res;
  }

  readNotification(notification: Notification): void {
    notification.seen = true;
    const ind = this.notSeenNotifications.indexOf(notification);
    this.notSeenNotifications.splice(ind, 1);
    this.notificationService.readNotification(notification).subscribe({});
    const ind2 = this.notifications.indexOf(notification);
    this.notifications.splice(ind2, 1);
    this.notificationService.removeNotification(notification).subscribe({});
  }

  removeNotification(notification: Notification, event: Event): void {
    event.stopPropagation();
    const ind1 = this.notSeenNotifications.indexOf(notification);
    this.notSeenNotifications.splice(ind1, 1);
    const ind2 = this.notifications.indexOf(notification);
    this.notifications.splice(ind2, 1);
    this.notificationService.removeNotification(notification).subscribe({});
  }

  logOut(): void{
    this.router.navigate([`/`]).then(() => window.location.reload());
    localStorage.clear();
  }

  goToFriends(): void {
    this.router.navigate([`/friends`]).then(() => window.location.reload());
  }
}
