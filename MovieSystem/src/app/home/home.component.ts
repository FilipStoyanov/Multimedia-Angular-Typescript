import { Component, Inject, OnInit } from '@angular/core';
import { UserData } from '../registration/registration.component';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user$: Observable<UserData>;
  friends: UserData[];
  public linkConfig = {
    isAnchor: true,
    externalStyles: {
      color: '#ffffff',
    },
    text: 'Registration',
    link: '/registration',
  };

  public userData: UserData = {firstname: '', lastname: '', email: '', username: '', password: '', _id: '', friends: []};
  public showRegistrationButton: boolean;
  constructor(private store: Store<{user: UserData}>, private userService: UserService) {
    this.friends = [];
    this.showRegistrationButton = false;
    this.user$ = store.select('user');
    this.user$.subscribe( user => {
      this.userData.username = user.username;
    });
    if (JSON.parse(localStorage.getItem('user'))){
     this.showRegistrationButton = true;
    }
  }

  ngOnInit(): void {
  }

}
