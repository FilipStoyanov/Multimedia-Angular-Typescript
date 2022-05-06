"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MoviesComponent = void 0;
var core_1 = require("@angular/core");
var MoviesComponent = /** @class */ (function () {
    function MoviesComponent(movieService) {
        var _this = this;
        this.movieService = movieService;
        this.filterAccordion = {
            showContent: false,
            searchInput: '',
            selectInput: ''
        };
        this.films = [];
        this.btn1 = {
            isAscending: false,
            type: 'Popular'
        };
        this.btn2 = {
            isAscending: false,
            type: 'Year'
        };
        this.btn3 = {
            isAscending: false,
            type: 'Rating'
        };
        this.btn4 = {
            isAscending: false,
            type: 'Author'
        };
        this.sortButton = [this.btn1, this.btn2, this.btn3, this.btn4];
        this.initialFilms = __spreadArrays(this.films);
        this.movieService.getAll().subscribe(function (data) {
            console.log(data);
            _this.films = data.data;
        });
    }
    MoviesComponent.prototype.onClick = function (currBtn) {
        var indexBtn = this.sortButton.indexOf(currBtn);
        this.sortButton[indexBtn] = currBtn;
        for (var i = 0; i < 4; ++i) {
            if (i !== indexBtn) {
                this.sortButton[i].isAscending = false;
            }
        }
        var filterFilms = [];
        switch (indexBtn) {
            case 0: {
                if (this.sortButton[indexBtn].isAscending) {
                    filterFilms = this.films.sort(function (a, b) { return a.watches - b.watches; });
                }
                else {
                    filterFilms = this.films.sort(function (a, b) { return b.watches - a.watches; });
                }
                break;
            }
            case 1: {
                if (this.sortButton[indexBtn].isAscending) {
                    filterFilms = this.films.sort(function (a, b) { return a.year > b.year ? 1 : -1; });
                }
                else {
                    filterFilms = this.films.sort(function (a, b) { return a.year < b.year ? 1 : -1; });
                }
                break;
            }
            case 2: {
                if (this.sortButton[indexBtn].isAscending) {
                    filterFilms = this.films.sort(function (a, b) { return a.rating - b.rating; });
                }
                else {
                    filterFilms = this.films.sort(function (a, b) { return b.rating - a.rating; });
                }
                break;
            }
            case 3: {
                if (this.sortButton[indexBtn].isAscending) {
                    filterFilms = this.films.sort(function (a, b) { return a.producer > b.producer ? 1 : -1; });
                }
                else {
                    filterFilms = this.films.sort(function (a, b) { return a.producer < b.producer ? 1 : -1; });
                }
                break;
            }
        }
        console.log(this.films);
    };
    MoviesComponent.prototype.onFilterChange = function (res) {
        var _this = this;
        var filteredMovies = __spreadArrays(this.films);
        filteredMovies = this.initialFilms.filter(function (x) { return x.titleBg.toLowerCase().indexOf(_this.filterAccordion.searchInput.toLowerCase()) === 0; });
        if (filteredMovies.length === 0) {
            filteredMovies = this.initialFilms.filter(function (x) { return x.titleEn.toLowerCase().indexOf(_this.filterAccordion.searchInput.toLowerCase()) === 0; });
        }
        if (this.filterAccordion.selectInput) {
            filteredMovies = filteredMovies.filter(function (x) { return x.genre === _this.filterAccordion.selectInput; });
        }
        this.films = filteredMovies;
    };
    MoviesComponent.prototype.ngOnInit = function () {
    };
    MoviesComponent = __decorate([
        core_1.Component({
            selector: 'app-movies',
            templateUrl: './movies.component.html',
            styleUrls: ['./movies.component.scss']
        })
    ], MoviesComponent);
    return MoviesComponent;
}());
exports.MoviesComponent = MoviesComponent;
