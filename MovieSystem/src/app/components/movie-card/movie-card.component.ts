import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/services/movie.service';
import {MovieService} from '../../services/movie.service';
import { Collection } from 'src/app/services/collection.service';
import { CollectionService } from 'src/app/services/collection.service';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;
  movieCollection: Array<Collection>;
  showButtons: boolean;
  showRatingList: boolean;
  rates: Array<string>;
  navigationUrl: string;
  userId: string;
  showCollectionBtn: boolean;
  constructor(private router: Router, private movieService: MovieService, private collectionService: CollectionService) {
    this.userId = JSON.parse(localStorage.getItem('user'))._id;
    this.showButtons = false;
    this.rates = ['5', '4', '3', '2', '1'];
    this.collectionService.getAllForUser(this.userId).subscribe(
      res => {
        this.showCollectionBtn = (res as any).length;
        this.movieCollection = (res as any);
      },
    );
  }

  hideCardButtons(event): void{
        this.showButtons = false;
  }

  showCardButtons(event): void{
    this.showButtons = true;
  }

  openMovieScreen(): void {
     localStorage.setItem('movieId', this.movie._id);
     this.navigationUrl = `/movie/${this.movie._id}`;
    //  this.router.navigate([`/movie/${this.movie._id}`]);
  }

  ngOnInit(): void {
  }

  openRatingList(): void {
    this.showRatingList = !this.showRatingList;
  }

  rating(rate: string): void {
     const userId = JSON.parse(localStorage.getItem('user'))._id;
     this.movieService.rateMovie(this.movie._id, rate, userId).subscribe({});
     this.openRatingList();
    //  setTimeout( () => {
    //    this.router.navigate([`/movie/${this.movie._id}`]).then(() => window.location.reload);
    //  }, 1000);
  }

  addToCollection(collection: Collection): void {
      this.collectionService.updateCollection(collection._id, this.movie.titleEn, this.movie.titleBg,
      this.movie.image, this.movie.year, this.movie._id).subscribe();
  }

}
