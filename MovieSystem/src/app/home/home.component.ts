import { Component, OnInit } from '@angular/core';
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
  public popularMovies = [
    {path: '../../assets/home/movie.png', description: 'No description', title: 'IMAGE', link: 'https://www.imdb.com/title/tt10872600/'},
    {path: '../../assets/home/movie.png', description: 'No description', title: 'IMAGE', link: 'https://www.imdb.com/title/tt10872600/'},
    {path: '../../assets/home/movie.png', description: 'No description', title: 'IMAGE', link: 'https://www.imdb.com/title/tt10872600/'},
    {path: '../../assets/home/movie.png', description: 'No description', title: 'IMAGE', link: 'https://www.imdb.com/title/tt10872600/'},
  ];
  constructor(private store: Store<{user: UserData}>) {
    this.user$ = store.select('user');
    this.user$.subscribe(user => console.log(user));
  }

  ngOnInit(): void {
  }

}
