import { Component, Inject, OnInit } from '@angular/core';
import { UserData } from '../registration/registration.component';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user$: Observable<UserData>;
  public linkConfig = {
    isAnchor: true,
    externalStyles: {
      color: '#ffffff',
    },
    text: 'Registration',
    link: '/registration',
  };

  public userData: UserData = {firstName: '', lastName: '', email: '', username: '', password: '', id: ''};
  constructor(private store: Store<{user: UserData}>) {
    this.user$ = store.select('user');
    this.user$.subscribe( user => {
      console.log(user);
      this.userData.username = user.username;
    });
    // this.image$ = store.select('image');
    // console.log(this.image$);
    // this.image$.subscribe(image => {
    //   console.log(image);
    // });
  }

  ngOnInit(): void {
  }

}
