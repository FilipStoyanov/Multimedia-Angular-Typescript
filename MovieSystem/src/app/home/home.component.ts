import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

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
  constructor() {}

  ngOnInit(): void {}
}
