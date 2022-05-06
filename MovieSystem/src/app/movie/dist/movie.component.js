"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovieComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var MovieComponent = /** @class */ (function () {
    function MovieComponent(router, movieService, commentService, datePipe) {
        var _this = this;
        this.router = router;
        this.movieService = movieService;
        this.commentService = commentService;
        this.datePipe = datePipe;
        this.commentInput = '';
        this.showTextArea = false;
        this.review = { username: '', image: '', id: '', description: '', date: '' };
        var movieId = localStorage.getItem('movieId');
        this.movieService.getMovieById(movieId).subscribe(function (data) {
            _this.movieData = data;
            _this.videoId = _this.getVideoId(data.trailer);
        });
        this.commentService.getCommentById(movieId).subscribe(function (data) {
            _this.comments = data;
        });
        // PASSING DATA WITH PROPS
        // if (this.router.getCurrentNavigation().extras.state){
        //    this.hasData = this.router.getCurrentNavigation().extras.state;
        //    if (this.hasData){
        //      this.movieData = this.hasData.movie ? JSON.parse(this.hasData.movie) : '';
        //    }
        // }
    }
    MovieComponent.prototype.ngOnInit = function () {
        console.log(this.comments);
    };
    MovieComponent.prototype.getVideoId = function (str) {
        var words = str.split('=');
        return words[1];
    };
    MovieComponent.prototype.writeComment = function (event) {
        this.commentInput = event.target.value;
    };
    MovieComponent.prototype.toggleInput = function () {
        this.showTextArea = !this.showTextArea;
    };
    MovieComponent.prototype.addReview = function () {
        this.date = new Date();
        this.review.description = this.commentInput;
        this.review.date = this.datePipe.transform(this.date, 'dd-MM-yyyy');
        this.review.id = localStorage.getItem('movieId');
        this.review.image = 'blabla';
        this.review.username = JSON.parse(localStorage.getItem('user')).username;
        this.commentService.addComment(this.review).subscribe();
        this.toggleInput();
        this.comments.push(this.review);
    };
    MovieComponent = __decorate([
        core_1.Component({
            selector: 'app-movie',
            templateUrl: './movie.component.html',
            styleUrls: ['./movie.component.scss'],
            providers: [common_1.DatePipe]
        })
    ], MovieComponent);
    return MovieComponent;
}());
exports.MovieComponent = MovieComponent;
