import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

interface SortBtn {
  isAscending: boolean;
  type: string;
}
interface Film {
  titleBg?: string;
  titleEn?: string;
  year?: string;
  image?: string;
  genre?: string;
  author?: string;
  rating?: number;
  watches?: number;
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
export class MoviesComponent implements OnChanges {

  filterAccordion: Accordion = {
    showContent: false,
    searchInput: '',
    selectInput: '',
  };

  initialFilms: Array<Film> = [
    {
      titleBg: 'Бързи и яростни', titleEn: 'Fast and furious', year: '2020', image: '../../assets/home/spider-man.jpg', genre: 'action',
      rating: 1, watches: 5
    },
    {
      titleBg: 'Лов на вещици', titleEn: 'Witch hunt', year: '2020', image: '../../assets/home/spider-man.jpg', genre: 'comedy',
      rating: 5,  watches: 10
    },
    {
      titleBg: 'Островите', titleEn: 'The islands', year: '2020', image: '../../assets/home/spider-man.jpg', genre: 'animations',
      rating: 4,  watches: 15
    },
    {
      titleBg: 'Американски бежанец', titleEn: 'American Refugee', year: '2020', image: '../../assets/home/spider-man.jpg',
      genre: 'action', rating: 3,  watches: 11
    },
    {
      titleBg: 'Американски бежанец', titleEn: 'American Refugee', year: '2021', image: '../../assets/home/spider-man.jpg',
      genre: 'comedy', rating: 2,  watches: 7
    },
  ];

  films: Array<Film> = [];


  btn1: SortBtn = {
    isAscending: false,
    type: 'Popular',
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

  constructor() {
    this.films = [...this.initialFilms];
  }


  onClick(currBtn: SortBtn): void {
    const indexBtn = this.sortButton.indexOf(currBtn);
    this.sortButton[indexBtn] = currBtn;
    for (let i = 0; i < 4; ++i){
       if (i !== indexBtn){
         this.sortButton[i].isAscending = false;
       }
    }
    let filterFilms: Array<Film> = [];
    switch (indexBtn){
      case 0: {
        if (this.sortButton[indexBtn].isAscending){
          filterFilms = this.films.sort( (a, b) => a.watches - b.watches );
        }else{
          filterFilms = this.films.sort( (a, b) => b.watches - a.watches );
        }
        break;
      }
      case 1: {
        if (this.sortButton[indexBtn].isAscending){
          filterFilms = this.films.sort( (a, b) =>  a.year > b.year ? 1 : -1 );
        }else{
          filterFilms = this.films.sort( (a, b) =>  a.year < b.year ? 1 : -1 );
        }
        break;
      }
      case 2: {
        if (this.sortButton[indexBtn].isAscending){
          filterFilms = this.films.sort( (a, b) =>  a.rating - b.rating );
        }else{
          filterFilms = this.films.sort( (a, b) =>  b.rating - a.rating );

        }
        break;
      }
      case 3: {
        if (this.sortButton[indexBtn].isAscending){
          filterFilms = this.films.sort( (a, b) =>  a.author > b.author ? 1 : -1 );
        }else{
          filterFilms = this.films.sort( (a, b) =>  a.author < b.author ? 1 : -1 );

        }
        break;
      }
    }
    console.log(this.films);
  }

  onFilterChange(res: Accordion): void {
    let filteredMovies: Array<Film> = [...this.films];
    filteredMovies = this.initialFilms.filter(x => x.titleBg.toLowerCase().indexOf(this.filterAccordion.searchInput.toLowerCase()) === 0);
    if (filteredMovies.length === 0) {
      filteredMovies = this.initialFilms.filter(x => x.titleEn.toLowerCase().indexOf(this.filterAccordion.searchInput.toLowerCase()) === 0);
    }
    if (this.filterAccordion.selectInput) {
      filteredMovies = filteredMovies.filter(x => x.genre === this.filterAccordion.selectInput);
    }
    this.films = filteredMovies;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
