"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarouselComponent = void 0;
var core_1 = require("@angular/core");
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(movies) {
        var _this = this;
        this.movies = movies;
        this.films = [];
        this.lastFilms = [];
        this.movies.getAll().subscribe(function (data) {
            _this.films = data.data;
            _this.films.sort(function (a, b) { return parseFloat(b.year) - parseFloat(a.year); });
            _this.lastFilms = [
                _this.films[0],
                _this.films[1],
                _this.films[2],
                _this.films[_this.films.length - 2],
                _this.films[7],
            ];
        });
    }
    CarouselComponent.prototype.openMovieLink = function (url) {
        window.open(url, '_blank');
    };
    CarouselComponent.prototype.ngOnInit = function () {
    };
    CarouselComponent = __decorate([
        core_1.Component({
            selector: 'app-carousel',
            templateUrl: './carousel.component.html',
            styleUrls: ['./carousel.component.scss']
        })
    ], CarouselComponent);
    return CarouselComponent;
}());
exports.CarouselComponent = CarouselComponent;
