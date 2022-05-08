import { Component, OnInit, Inject } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { Movie } from '../services/movie.service';


export interface Collection {
    name: string;
    movies?: Array<Movie>;
    _id: string;
    userId?: string;
}

export class MyCollection implements Collection {
  name: string;
  movies: Array<Movie>;
  // tslint:disable-next-line:variable-name
  _id: string;
  userId: string;
  constructor(private collectionName: string){
    this.name = collectionName;
  }
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  collectionName: string;
  userCollections: Collection [] = [];
  userId: string;
  movieUrl: string;

  constructor(private collectionService: CollectionService) {
    this.userId = JSON.parse(localStorage.getItem('user'))._id;
    this.movieUrl = '/movie/';
    this.collectionService.getAllForUser(this.userId).subscribe(
      result => {
        this.userCollections = (result as any);
      },
    );
  }
  ngOnInit(): void {
  }
  removeCollection(collection: Collection, event: any): void {
    event.preventDefault();
    this.collectionService.removeCollection(collection._id).subscribe();
    window.location.reload();
  }
  removeMovie(collection: Collection, movie: Movie ): void {
    this.collectionService.updateCollection(collection._id, movie.titleEn, movie.titleBg, movie.image, movie.year, movie._id).subscribe();
    const ind = this.userCollections.findIndex(obj => obj._id === collection._id);
    const movieInd = this.userCollections[ind].movies.findIndex(obj => obj.id === movie._id);
    this.userCollections[ind].movies.splice(movieInd, 1);
  }


}
