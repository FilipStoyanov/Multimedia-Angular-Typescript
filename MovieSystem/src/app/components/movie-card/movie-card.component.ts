import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/services/movie.service';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;
  showButtons: boolean;
  constructor(private router: Router) {
    this.showButtons = false;
  }

  hideCardButtons(event): void{
        this.showButtons = false;
  }

  showCardButtons(event): void{
    this.showButtons = true;
  }

  openMovieScreen(): void {
     localStorage.setItem('movieId', this.movie._id);
     this.router.navigate([`/movie/${this.movie._id}`]);
  }

  ngOnInit(): void {
  }

}
