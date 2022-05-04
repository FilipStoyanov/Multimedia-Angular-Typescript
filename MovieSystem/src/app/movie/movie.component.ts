import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../services/movie.service';
import {Router} from '@angular/router';
import {MovieService} from '../services/movie.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movieData: Movie;
  videoId: string;
  constructor(private router: Router, private movieService: MovieService) {
    const movieId: string = localStorage.getItem('movieId');
    this.movieService.getMovieById(movieId).subscribe(data => {
      this.movieData = data; this.videoId = this.getVideoId( data.trailer);
    });
      // if (this.router.getCurrentNavigation().extras.state){
      //    this.hasData = this.router.getCurrentNavigation().extras.state;
      //    if (this.hasData){
      //      this.movieData = this.hasData.movie ? JSON.parse(this.hasData.movie) : '';
      //    }
      // }
   }

  ngOnInit(): void {
  }

  getVideoId(str: string): string {
    const words = str.split('=');
    return words[1];
  }

}
