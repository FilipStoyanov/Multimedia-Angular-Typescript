import { Component, OnInit, Inject } from '@angular/core';
import { CollectionService } from '../services/collection.service';
import { Movie } from '../services/movie.service';
import { Preference, PreferenceService } from '../services/preference.service';
import { UserData } from '../registration/registration.component';
import { NotificationService } from '../services/notification.service';


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
  user: UserData;
  friends: Array<string>;
  showSendAlert: boolean;
  showSendIcon: string;
  constructor(private collectionService: CollectionService, private preferenceService: PreferenceService,
              private notificationService: NotificationService) {
    this.userId = JSON.parse(localStorage.getItem('user'))._id;
    this.movieUrl = '/movie/';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.friends = [];
    if (localStorage.getItem('show')){
      this.showSendIcon = localStorage.getItem('show');
    }else{
      this.showSendIcon = 'true';
    }
    for (const  fr of this.user.friends){
       this.friends.push(fr.id);
    }

    this.collectionService.getAllForUser(this.userId).subscribe(
      result => {
        console.log(result as any);
        this.userCollections = (result as any);
      },
    );

  }
  ngOnInit(): void {
  }
  sendCollection(collection: Collection, event: Event): void {
    event.stopPropagation();
    const preference: Preference = {senderId: this.user._id, senderUsername: this.user.username, movies: collection.movies,
    collectionId: collection._id, collectionName: collection.name, receivers: this.friends };
    this.preferenceService.addPreference(preference).subscribe({});
    this.showSendAlert = true;
    setTimeout( () => {
      this.showSendAlert = false;
    }, 3000);
    localStorage.setItem('show', 'false');
    this.showSendIcon = 'false';


  }
  removeCollection(collection: Collection, event: any): void {
    event.stopPropagation();
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
