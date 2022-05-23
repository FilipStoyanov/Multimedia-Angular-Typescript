import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MovieService} from '../services/movie.service';
import {HTMLInputEvent} from '../registration/step2/step2.component';
import {Movie} from '../services/movie.service';

interface SortBtn {
  isAscending: boolean;
  type: string;
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

  films: Movie[];
  initialFilms: Movie[];


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
  addMovie: Movie = { image: '', titleEn: '', titleBg: '', trailer: '', producer: '', year: '',
                     genre: '', country: '', description: '', _id: ''};
  userMovies: Movie [] = [];
  constructor(private movieService: MovieService, private modalService: NgbModal) {
    this.films = [];
    if (JSON.parse(localStorage.getItem('user'))){
      this.addMovie.userId = JSON.parse(localStorage.getItem('user'))._id;
    }
    this.movieService.getAll().subscribe(data => {
      this.films = (data as any).data;
      if (JSON.parse(localStorage.getItem('user'))){
        this.userMovies = (data as any).data.filter(obj => obj.userId === JSON.parse(localStorage.getItem('user'))._id);
      }
    });
    this.initialFilms = [...this.films];
  }

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

  openMovieModal(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  readUrl(event: HTMLInputEvent): void{
    if ( event.target.files && event.target.files[0] ){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.addMovie.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void{
    document.getElementById('movieImage').click();
  }

  removeImage(): void{
    this.addMovie.image = '';
  }

  onBtnClick(): void{
    if (this.addMovie.image === ''){
       this.uploadImage();
     }else {
       this.removeImage();
     }
  }

  onChangeImage(event: any): void {
    this.addMovie.image = event.target.value;
  }
  onChangeNameEN(event: any): void {
    this.addMovie.titleEn = event.target.value;
  }
  onChangeNameBG(event: any): void {
    this.addMovie.titleBg = event.target.value;
  }
  onChangeTrailer(event: any): void {
    this.addMovie.trailer = event.target.value;
  }
  onChangeYear(event: any): void {
    this.addMovie.year = event.target.value;
  }
  onChangeDirector(event: any): void {
    this.addMovie.producer = event.target.value;
  }
  onChangeGenre(event: any): void {
    this.addMovie.genre = event.target.value;
  }
  onChangeCountry(event: any): void {
    this.addMovie.country = event.target.value;
  }
  onChangeDescription(event: any): void {
    this.addMovie.description = event.target.value;
  }
  createMovie(): void {
    this.films.push(this.addMovie);
    this.userMovies.push(this.addMovie);
    this.movieService.addMovie(this.addMovie).subscribe();
  }

}
