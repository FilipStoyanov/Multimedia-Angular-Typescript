import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Movie } from '../services/movie.service';
import {ActivatedRoute} from '@angular/router';
import {CommentService, Comment} from '../services/comment.service';
import {MovieService} from '../services/movie.service';
import { HTMLInputEvent } from '../registration/step2/step2.component';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../services/notification.service';
import { UserData } from '../registration/registration.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [DatePipe],
})
export class MovieComponent implements OnInit {

  movieData: Movie;
  comments: Comment[];
  commentInput: string;
  videoId: string;
  showTextArea: boolean;
  review: Comment;
  date: Date;
  movieId: string;
  imageUrl: string | ArrayBuffer;
  parserUser: UserData;
  constructor(private router: ActivatedRoute, private movieService: MovieService, private commentService: CommentService,
              private datePipe: DatePipe, private notificationService: NotificationService ) {
    this.commentInput = '';
    this.parserUser = null;
    this.imageUrl = '';
    this.showTextArea = false;
    this.review = {username: '', userId: '', image: '', id: '', description: '', date: '', _id: ''};
    this.movieId = this.router.snapshot.paramMap.get('movieId');
    this.movieService.getMovieById(this.movieId).subscribe(data => {
      this.movieData = data; this.videoId = this.getVideoId( data.trailer);
    });
    this.commentService.getCommentById(this.movieId).subscribe(data => {
      this.comments = (data as any);
    });
    this.parserUser = JSON.parse(localStorage.getItem('user'));

      // PASSING DATA WITH PROPS
      // if (this.router.getCurrentNavigation().extras.state){
      //    this.hasData = this.router.getCurrentNavigation().extras.state;
      //    if (this.hasData){
      //      this.movieData = this.hasData.movie ? JSON.parse(this.hasData.movie) : '';
      //    }
      // }
   }
   removeComment(comment: Comment): void {
    const ind = this.comments.indexOf(comment);
    this.comments.splice(ind, 1);
    this.commentService.removeComment(comment._id).subscribe();
  }
  readUrl(event: HTMLInputEvent): void{
    if ( event.target.files && event.target.files[0] ){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  uploadImage(): void{
    document.getElementById('movieImage').click();
  }

  removeImage(): void{
    this.imageUrl = '';
  }

  onBtnClick(): void{
    if (this.imageUrl === ''){
       this.uploadImage();
     }else {
       this.removeImage();
     }
  }

  ngOnInit(): void {
  }

  getVideoId(str: string): string {
    const words = str.split('=');
    return words[1];
  }

  writeComment(event): void {
    this.commentInput = event.target.value;
  }

  toggleInput(): void {
    this.showTextArea = !this.showTextArea;
  }
  addReview(): void {
     this.date = new Date();
     this.review.description = this.commentInput;
     this.review.date = this.datePipe.transform(this.date, 'dd-MM-yyyy');
     this.review.id = localStorage.getItem('movieId');
     if (JSON.parse(localStorage.getItem('user')).image){
       this.review.image = JSON.parse(localStorage.getItem('user')).image;
     }
     const notification: Notification = {senderId: this.parserUser._id , senderUsername: this.parserUser.username,
     receiver: this.movieData.userId, movieId: this.movieData._id, type: 'review'};
     if ('userId' in this.movieData && notification.senderId !== notification.receiver){
        this.notificationService.addNotification(notification).subscribe({});
     }
     this.review.username = JSON.parse(localStorage.getItem('user')).username;
     this.review.userId = this.parserUser._id;
     this.commentService.addComment(this.review).subscribe();
     this.toggleInput();
     this.comments.push(this.review);
  }
}
