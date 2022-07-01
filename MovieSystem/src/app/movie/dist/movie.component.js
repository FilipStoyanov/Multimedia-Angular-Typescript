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
    function MovieComponent(router, movieService, commentService, datePipe, notificationService) {
        var _this = this;
        this.router = router;
        this.movieService = movieService;
        this.commentService = commentService;
        this.datePipe = datePipe;
        this.notificationService = notificationService;
        this.commentInput = '';
        this.parserUser = null;
        this.imageUrl = '';
        this.showTextArea = false;
        this.review = { username: '', userId: '', image: '', id: '', description: '', date: '', _id: '' };
        this.movieId = this.router.snapshot.paramMap.get('movieId');
        this.movieService.getMovieById(this.movieId).subscribe(function (data) {
            _this.movieData = data;
            _this.videoId = _this.getVideoId(data.trailer);
        });
        this.commentService.getCommentById(this.movieId).subscribe(function (data) {
            _this.comments = data;
        });
        this.parserUser = JSON.parse(localStorage.getItem('user'));
        if (this.parserUser && '_id' in this.parserUser) {
            this.isRegisteredUser = true;
        }
        else {
            this.isRegisteredUser = false;
        }
        // PASSING DATA WITH PROPS
        // if (this.router.getCurrentNavigation().extras.state){
        //    this.hasData = this.router.getCurrentNavigation().extras.state;
        //    if (this.hasData){
        //      this.movieData = this.hasData.movie ? JSON.parse(this.hasData.movie) : '';
        //    }
        // }
    }
    MovieComponent.prototype.removeComment = function (comment) {
        var ind = this.comments.indexOf(comment);
        this.comments.splice(ind, 1);
        this.commentService.removeComment(comment._id).subscribe();
    };
    MovieComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) {
                _this.imageUrl = reader_1.result;
            };
            reader_1.readAsDataURL(file);
        }
    };
    MovieComponent.prototype.uploadImage = function () {
        document.getElementById('movieImage').click();
    };
    MovieComponent.prototype.removeImage = function () {
        this.imageUrl = '';
    };
    MovieComponent.prototype.onBtnClick = function () {
        if (this.imageUrl === '') {
            this.uploadImage();
        }
        else {
            this.removeImage();
        }
    };
    MovieComponent.prototype.ngOnInit = function () {
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
        var _this = this;
        this.date = new Date();
        this.review.description = this.commentInput;
        this.review.date = this.datePipe.transform(this.date, 'dd-MM-yyyy');
        this.review.id = localStorage.getItem('movieId');
        if (JSON.parse(localStorage.getItem('user')).image) {
            this.review.image = JSON.parse(localStorage.getItem('user')).image;
        }
        var notification = { senderId: this.parserUser._id, senderUsername: this.parserUser.username,
            receiver: this.movieData.userId, movieId: this.movieData._id, type: 'review' };
        if ('userId' in this.movieData && notification.senderId !== notification.receiver) {
            this.notificationService.addNotification(notification).subscribe({});
        }
        this.review.username = JSON.parse(localStorage.getItem('user')).username;
        this.review.userId = this.parserUser._id;
        console.log(this.review);
        setTimeout(function () {
            _this.commentService.addComment(_this.review).subscribe();
        }, 1000);
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
