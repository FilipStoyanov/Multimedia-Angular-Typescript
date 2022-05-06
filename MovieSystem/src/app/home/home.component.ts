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
  friendNames: string[];
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
  constructor(private store: Store<{user: UserData}>, private userService: UserService) {
    this.friends = [];
    this.user$ = store.select('user');
    if (localStorage.getItem('user')){
       this.friendNames = JSON.parse(localStorage.getItem('user')).friends;
    }
    this.user$.subscribe( user => {
      this.userData.username = user.username;
    });
  }

  ngOnInit(): void {
  }

}
