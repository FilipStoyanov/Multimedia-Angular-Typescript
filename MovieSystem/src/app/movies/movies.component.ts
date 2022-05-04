import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {MovieService} from '../services/movie.service';

interface SortBtn {
  isAscending: boolean;
  type: string;
}
interface Movie {
  titleBg: string;
  titleEn: string;
  year: string;
  image: string;
  genre: string;
  producer: string;
  rating: number;
  watches: number;
  country: string;
  _id: string;
  description: string;
  trailer: string;
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

  films: Movie[] = [];


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
  sortButton: SortBtn[] = [this.btn1, this.btn2, this.btn3, this.btn4];

  constructor(private movieService: MovieService) {
    this.movieService.getAll().subscribe(data => {
      console.log(data);
      this.films = (data as any).data;
    });
  }
  initialFilms = [...this.films];



  onClick(currBtn: SortBtn): void {
    const indexBtn = this.sortButton.indexOf(currBtn);
    this.sortButton[indexBtn] = currBtn;
    for (let i = 0; i < 4; ++i){
       if (i !== indexBtn){
         this.sortButton[i].isAscending = false;
       }
    }
    let filterFilms: Movie[] = [];
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
          filterFilms = this.films.sort( (a, b) =>  a.producer > b.producer ? 1 : -1 );
        }else{
          filterFilms = this.films.sort( (a, b) =>  a.producer < b.producer ? 1 : -1 );

        }
        break;
      }
    }
    console.log(this.films);
  }


  onFilterChange(res: Accordion): void {
    let filteredMovies: Movie[] = [...this.films];
    filteredMovies = this.initialFilms.filter(x => x.titleBg.toLowerCase().indexOf(this.filterAccordion.searchInput.toLowerCase()) === 0);
    if (filteredMovies.length === 0) {
      filteredMovies = this.initialFilms.filter(x => x.titleEn.toLowerCase().indexOf(this.filterAccordion.searchInput.toLowerCase()) === 0);
    }
    if (this.filterAccordion.selectInput) {
      filteredMovies = filteredMovies.filter(x => x.genre === this.filterAccordion.selectInput);
    }
    this.films = filteredMovies;
  }

  ngOnInit(): void {
  }

}
