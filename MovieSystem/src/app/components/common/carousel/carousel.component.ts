import { Component, OnInit, Input } from '@angular/core';
import { Movie, MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  films: Movie[] = [];
  lastFilms = [];
  constructor(private movies: MovieService) {
     this.movies.getAll().subscribe(data => {
       this.films = (data as any).data;
       this.films.sort((a, b) => parseFloat(b.year) - parseFloat(a.year));
       this.lastFilms = [
         this.films[0],
         this.films[1],
         this.films[2],
         this.films[this.films.length - 2],
         this.films[7],
        ];
     });
  }

  openMovieLink(url): void{
   window.open(url, '_blank');
  }
  ngOnInit(): void {
  }

}
