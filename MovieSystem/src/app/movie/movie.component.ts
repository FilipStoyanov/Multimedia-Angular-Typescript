import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Movie } from '../services/movie.service';
import {Router} from '@angular/router';
import {CommentService, Comment} from '../services/comment.service';
import {MovieService} from '../services/movie.service';
import { HTMLInputEvent } from '../registration/step2/step2.component';

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
  imageUrl: string | ArrayBuffer;
  constructor(private router: Router, private movieService: MovieService, private commentService: CommentService,
              private datePipe: DatePipe ) {
    this.commentInput = '';
    this.imageUrl = '';
    this.showTextArea = false;
    this.review = {username: '', image: '', id: '', description: '', date: '', _id: ''};
    const movieId: string = localStorage.getItem('movieId');
    this.movieService.getMovieById(movieId).subscribe(data => {
      console.log(data);
      this.movieData = data; this.videoId = this.getVideoId( data.trailer);
    });
    this.commentService.getCommentById(movieId).subscribe(data => {
      this.comments = (data as any);
    });
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
     this.review.image = 'blabla';
     this.review.username = JSON.parse(localStorage.getItem('user')).username;
     this.commentService.addComment(this.review).subscribe();
     this.toggleInput();
     this.comments.push(this.review);
  }
}
