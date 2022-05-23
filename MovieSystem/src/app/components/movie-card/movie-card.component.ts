import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/services/movie.service';
import {MovieService} from '../../services/movie.service';
import { Collection } from 'src/app/services/collection.service';
import { CollectionService } from 'src/app/services/collection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HTMLInputEvent } from 'src/app/registration/step2/step2.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;
  editedMovie: Movie;
  movieCollection: Array<Collection>;
  showButtons: boolean;
  showRatingList: boolean;
  showEdit: boolean;
  rates: Array<string>;
  navigationUrl: string;
  userId: string;
  userRole: string;
  showCollectionBtn: boolean;
  constructor(private router: Router, private movieService: MovieService, private collectionService: CollectionService,
              private modalService: NgbModal, private deleteModal: NgbModal) {
    if (JSON.parse(localStorage.getItem('user'))){
      this.userId = JSON.parse(localStorage.getItem('user'))._id;
      this.userRole = JSON.parse(localStorage.getItem('user')).role;
    }
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
  }

  ngOnInit(): void {
     this.editedMovie = {image: this.movie.image, titleEn: this.movie.titleEn, titleBg: this.movie.titleBg, year: this.movie.year,
                         trailer: this.movie.trailer, country: this.movie.country, description: this.movie.description,
                         genre: this.movie.genre, producer: this.movie.producer, _id: this.movie._id, userId: this.movie.userId};
     if ('userId' in this.movie){
      this.showEdit = (this.userId === this.movie.userId) || this.userRole === 'admin';
    }else{
      if (this.userRole){
      this.showEdit = this.userRole === 'admin';
      }else{
        this.showEdit = false;
      }
    }
  }

  openRatingList(): void {
    this.showRatingList = !this.showRatingList;
  }

  showRegistrationMessage(): void {
    this.showRatingList = true;
  }

  closeRegistrationMessage(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.showRatingList = false;
  }

  rating(rate: string): void {
     let userId;
     if (JSON.parse(localStorage.getItem('user'))){
       userId = JSON.parse(localStorage.getItem('user'))._id;
     }
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

  openDeleteModal(deleteMod): void {
    this.deleteModal.open(deleteMod, {backdropClass: 'light-blue-backdrop'});
  }
  deleteMovie(): void {
    this.movieService.removeMovie(this.movie).subscribe();
    window.location.reload();
  }
  editMovie(): void {
    this.movieService.editMovie(this.editedMovie).subscribe();
    window.location.reload();
  }
  readUrl(event: HTMLInputEvent): void{
    if ( event.target.files && event.target.files[0] ){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editedMovie.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void{
    document.getElementById('movieImage').click();
  }

  removeImage(): void{
    this.editedMovie.image = '';
  }

  onBtnClick(): void{
    if (this.editedMovie.image === ''){
       this.uploadImage();
     }else {
       this.removeImage();
     }
  }

  onChangeImage(event: any): void {
    this.editedMovie.image = event.target.value;
  }
  onChangeNameEN(event: any): void {
    this.editedMovie.titleEn = event.target.value;
  }
  onChangeNameBG(event: any): void {
    this.editedMovie.titleBg = event.target.value;
  }
  onChangeTrailer(event: any): void {
    this.editedMovie.trailer = event.target.value;
  }
  onChangeYear(event: any): void {
    this.editedMovie.year = event.target.value;
  }
  onChangeDirector(event: any): void {
    this.editedMovie.producer = event.target.value;
  }
  onChangeGenre(event: any): void {
    this.editedMovie.genre = event.target.value;
  }
  onChangeCountry(event: any): void {
    this.editedMovie.country = event.target.value;
  }
  onChangeDescription(event: any): void {
    this.editedMovie.description = event.target.value;
  }
  openEditModal(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

}
