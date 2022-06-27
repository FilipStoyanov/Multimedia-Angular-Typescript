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
    function MoviesComponent(movieService, modalService) {
        var _this = this;
        this.movieService = movieService;
        this.modalService = modalService;
        this.filterAccordion = {
            showContent: false,
            searchInput: '',
            selectInput: ''
        };
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
            type: 'Producer'
        };
        this.sortButton = [this.btn1, this.btn2, this.btn3, this.btn4];
        this.addMovie = { image: '', titleEn: '', titleBg: '', trailer: '', producer: '', year: '',
            genre: '', country: '', description: '', _id: '' };
        this.userMovies = [];
        this.films = [];
        if (JSON.parse(localStorage.getItem('user'))) {
            this.addMovie.userId = JSON.parse(localStorage.getItem('user'))._id;
        }
        this.movieService.getAll().subscribe(function (data) {
            _this.films = data.data;
            if (JSON.parse(localStorage.getItem('user'))) {
                _this.userMovies = data.data.filter(function (obj) { return obj.userId === JSON.parse(localStorage.getItem('user'))._id; });
            }
        });
        this.initialFilms = __spreadArrays(this.films);
        console.log(this.films);
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
    MoviesComponent.prototype.openMovieModal = function (content) {
        this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    };
    MoviesComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) {
                _this.addMovie.image = reader_1.result;
            };
            reader_1.readAsDataURL(file);
        }
    };
    MoviesComponent.prototype.uploadImage = function () {
        document.getElementById('movieImage').click();
    };
    MoviesComponent.prototype.removeImage = function () {
        this.addMovie.image = '';
    };
    MoviesComponent.prototype.onBtnClick = function () {
        if (this.addMovie.image === '') {
            this.uploadImage();
        }
        else {
            this.removeImage();
        }
    };
    MoviesComponent.prototype.onChangeImage = function (event) {
        this.addMovie.image = event.target.value;
    };
    MoviesComponent.prototype.onChangeNameEN = function (event) {
        this.addMovie.titleEn = event.target.value;
    };
    MoviesComponent.prototype.onChangeNameBG = function (event) {
        this.addMovie.titleBg = event.target.value;
    };
    MoviesComponent.prototype.onChangeTrailer = function (event) {
        this.addMovie.trailer = event.target.value;
    };
    MoviesComponent.prototype.onChangeYear = function (event) {
        this.addMovie.year = event.target.value;
    };
    MoviesComponent.prototype.onChangeDirector = function (event) {
        this.addMovie.producer = event.target.value;
    };
    MoviesComponent.prototype.onChangeGenre = function (event) {
        this.addMovie.genre = event.target.value;
    };
    MoviesComponent.prototype.onChangeCountry = function (event) {
        this.addMovie.country = event.target.value;
    };
    MoviesComponent.prototype.onChangeDescription = function (event) {
        this.addMovie.description = event.target.value;
    };
    MoviesComponent.prototype.createMovie = function () {
        this.films.push(this.addMovie);
        this.userMovies.push(this.addMovie);
        this.movieService.addMovie(this.addMovie).subscribe();
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
