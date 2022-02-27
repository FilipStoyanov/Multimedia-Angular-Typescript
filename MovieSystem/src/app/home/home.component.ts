import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
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
      color: 'skyblue',
    },
    text: 'Registration',
    link: '/home',
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
