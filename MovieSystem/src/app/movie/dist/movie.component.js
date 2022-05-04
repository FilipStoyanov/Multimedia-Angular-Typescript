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
var MovieComponent = /** @class */ (function () {
    function MovieComponent(router, movieService) {
        var _this = this;
        this.router = router;
        this.movieService = movieService;
        var movieId = localStorage.getItem('movieId');
        this.movieService.getMovieById(movieId).subscribe(function (data) {
            _this.movieData = data;
            _this.videoId = _this.getVideoId(data.trailer);
        });
        // if (this.router.getCurrentNavigation().extras.state){
        //    this.hasData = this.router.getCurrentNavigation().extras.state;
        //    if (this.hasData){
        //      this.movieData = this.hasData.movie ? JSON.parse(this.hasData.movie) : '';
        //    }
        // }
    }
    MovieComponent.prototype.ngOnInit = function () {
    };
    MovieComponent.prototype.getVideoId = function (str) {
        var words = str.split('=');
        return words[1];
    };
    MovieComponent = __decorate([
        core_1.Component({
            selector: 'app-movie',
            templateUrl: './movie.component.html',
            styleUrls: ['./movie.component.scss']
        })
    ], MovieComponent);
    return MovieComponent;
}());
exports.MovieComponent = MovieComponent;
