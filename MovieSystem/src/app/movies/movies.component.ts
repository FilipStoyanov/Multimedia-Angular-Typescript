import { Component, OnInit } from '@angular/core';

interface SortBtn {
  isAscending: boolean;
  type: string;
}
interface Film {
  titleBg: string;
  titleEn: string;
}

interface Accordion {
  showContent: boolean;
  searchInput: string;
  selectInput: string;
}
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  filterAccordion: Accordion = {
    showContent: false,
    searchInput: '',
    selectInput: '',
  };

  films: Array<Film> = [
    {titleBg: 'Бързи и яростни', titleEn: 'Fast and furious'},
    {titleBg: 'Лов на вещици', titleEn: 'Witch hunt'},
    {titleBg: 'Островите', titleEn: 'The islands'},
    {titleBg: 'Американски бежанец', titleEn: 'American Refugee'},
    {titleBg: 'Американски бежанец', titleEn: 'American Refugee'},
  ];

  btn1: SortBtn = {
    isAscending: false,
    type: 'Date',
  };

  btn2: SortBtn = {
    isAscending: false,
    type: 'Year',
  };

  btn3: SortBtn = {
    isAscending: false,
    type: 'Rating',
  };

  btn4: SortBtn = {
    isAscending: false,
    type: 'Author',
  };
  sortButton: Array<SortBtn> = [this.btn1, this.btn2, this.btn3, this.btn4];

  constructor() { }


  onClick(currBtn: SortBtn): void{
    const indexBtn = this.sortButton.indexOf(currBtn);
    this.sortButton[indexBtn] = currBtn;
  }

  ngOnInit(): void {
  }

}
