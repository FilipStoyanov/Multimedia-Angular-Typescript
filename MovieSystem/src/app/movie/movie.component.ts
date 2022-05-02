import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../services/movie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movieData: Movie;
  hasData: any;
  constructor(private router: Router) {
      if (this.router.getCurrentNavigation().extras.state){
         this.hasData = this.router.getCurrentNavigation().extras.state;
         if (this.hasData){
           this.movieData = this.hasData.movie ? JSON.parse(this.hasData.movie) : '';
         }
      }
   }

  ngOnInit(): void {
    console.log(this.movieData.trailer);
  }

}
