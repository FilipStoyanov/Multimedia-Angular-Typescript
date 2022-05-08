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
    function MovieCardComponent(router, movieService, collectionService) {
        var _this = this;
        this.router = router;
        this.movieService = movieService;
        this.collectionService = collectionService;
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
