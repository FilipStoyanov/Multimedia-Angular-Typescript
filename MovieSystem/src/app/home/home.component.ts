import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  linkConfig = {
    isAnchor: true,
    externalStyles: {
      color: '#ffffff',
    },
    text: 'Registration',
    link: '/registration',
  };
  popularMovies = [
    { path: '../../assets/home/spider-man.jpg' },
    { path: '../../assets/home/spider-man.jpg' },
    { path: '../../assets/home/spider-man.jpg' },
    { path: '../../assets/home/spider-man.jpg' },
    { path: '../../assets/home/spider-man.jpg' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
