"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovieCardComponent = void 0;
var core_1 = require("@angular/core");
var MovieCardComponent = /** @class */ (function () {
    function MovieCardComponent(router, movieService, collectionService, modalService) {
        var _this = this;
        this.router = router;
        this.movieService = movieService;
        this.collectionService = collectionService;
        this.modalService = modalService;
        this.userId = JSON.parse(localStorage.getItem('user'))._id;
        this.showButtons = false;
        this.rates = ['5', '4', '3', '2', '1'];
        this.collectionService.getAllForUser(this.userId).subscribe(function (res) {
            _this.showCollectionBtn = res.length;
            _this.movieCollection = res;
        });
    }
    MovieCardComponent.prototype.hideCardButtons = function (event) {
        this.showButtons = false;
    };
    MovieCardComponent.prototype.showCardButtons = function (event) {
        this.showButtons = true;
    };
    MovieCardComponent.prototype.openMovieScreen = function () {
        localStorage.setItem('movieId', this.movie._id);
        this.navigationUrl = "/movie/" + this.movie._id;
        //  this.router.navigate([`/movie/${this.movie._id}`]);
    };
    MovieCardComponent.prototype.ngOnInit = function () {
        console.log(this.movie.image);
        this.editedMovie = { image: this.movie.image, titleEn: this.movie.titleEn, titleBg: this.movie.titleBg, year: this.movie.year,
            trailer: this.movie.trailer, country: this.movie.country, description: this.movie.description,
            genre: this.movie.genre, producer: this.movie.producer, _id: this.movie._id, userId: this.movie.userId };
        if ('userId' in this.movie) {
            this.showEdit = (this.userId === this.movie.userId);
        }
        else {
            this.showEdit = false;
        }
    };
    MovieCardComponent.prototype.openRatingList = function () {
        this.showRatingList = !this.showRatingList;
    };
    MovieCardComponent.prototype.rating = function (rate) {
        var userId = JSON.parse(localStorage.getItem('user'))._id;
        this.movieService.rateMovie(this.movie._id, rate, userId).subscribe({});
        this.openRatingList();
        //  setTimeout( () => {
        //    this.router.navigate([`/movie/${this.movie._id}`]).then(() => window.location.reload);
        //  }, 1000);
    };
    MovieCardComponent.prototype.addToCollection = function (collection) {
        this.collectionService.updateCollection(collection._id, this.movie.titleEn, this.movie.titleBg, this.movie.image, this.movie.year, this.movie._id).subscribe();
    };
    MovieCardComponent.prototype.deleteMovie = function () {
        this.movieService.removeMovie(this.movie).subscribe();
        window.location.reload();
    };
    MovieCardComponent.prototype.editMovie = function () {
        this.movieService.editMovie(this.editedMovie).subscribe();
        window.location.reload();
    };
    MovieCardComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) {
                _this.editedMovie.image = reader_1.result;
            };
            reader_1.readAsDataURL(file);
        }
    };
    MovieCardComponent.prototype.uploadImage = function () {
        document.getElementById('movieImage').click();
    };
    MovieCardComponent.prototype.removeImage = function () {
        this.editedMovie.image = '';
    };
    MovieCardComponent.prototype.onBtnClick = function () {
        if (this.editedMovie.image === '') {
            this.uploadImage();
        }
        else {
            this.removeImage();
        }
    };
    MovieCardComponent.prototype.onChangeImage = function (event) {
        this.editedMovie.image = event.target.value;
    };
    MovieCardComponent.prototype.onChangeNameEN = function (event) {
        this.editedMovie.titleEn = event.target.value;
    };
    MovieCardComponent.prototype.onChangeNameBG = function (event) {
        this.editedMovie.titleBg = event.target.value;
    };
    MovieCardComponent.prototype.onChangeTrailer = function (event) {
        this.editedMovie.trailer = event.target.value;
    };
    MovieCardComponent.prototype.onChangeYear = function (event) {
        this.editedMovie.year = event.target.value;
    };
    MovieCardComponent.prototype.onChangeDirector = function (event) {
        this.editedMovie.producer = event.target.value;
    };
    MovieCardComponent.prototype.onChangeGenre = function (event) {
        this.editedMovie.genre = event.target.value;
    };
    MovieCardComponent.prototype.onChangeCountry = function (event) {
        this.editedMovie.country = event.target.value;
    };
    MovieCardComponent.prototype.onChangeDescription = function (event) {
        this.editedMovie.description = event.target.value;
    };
    MovieCardComponent.prototype.openEditModal = function (content) {
        this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    };
    __decorate([
        core_1.Input()
    ], MovieCardComponent.prototype, "movie");
    MovieCardComponent = __decorate([
        core_1.Component({
            selector: 'app-movie-card',
            templateUrl: './movie-card.component.html',
            styleUrls: ['./movie-card.component.scss']
        })
    ], MovieCardComponent);
    return MovieCardComponent;
}());
exports.MovieCardComponent = MovieCardComponent;
