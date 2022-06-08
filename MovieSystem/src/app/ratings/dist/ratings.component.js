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
exports.RatingsComponent = void 0;
var core_1 = require("@angular/core");
var RatingsComponent = /** @class */ (function () {
    function RatingsComponent(rankingService) {
        var _this = this;
        this.rankingService = rankingService;
        this.rankingCollections = [];
        this.showApplyAlert = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.rankingService.getAllRankingsByUserId(this.user._id).subscribe(function (data) {
            _this.rankingCollections = data.data;
            //
        });
    }
    RatingsComponent.prototype.ngOnInit = function () {
    };
    RatingsComponent.prototype.removeCollection = function (ranking, event) {
        event.stopPropagation();
        var ind = this.rankingCollections.indexOf(ranking);
        this.rankingCollections.splice(ind, 1);
        this.rankingService.deleteRanking(ranking).subscribe({});
    };
    RatingsComponent.prototype.applyChanges = function (ranking, event) {
        var _this = this;
        event.stopPropagation();
        var arr = [];
        var sortedIndex = [];
        var len;
        var movies = [];
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < ranking.movies.length; ++i) {
            // tslint:disable-next-line:prefer-for-of
            len = ranking.movies[i].length;
            for (var j = 0; j < ranking.movies[i].length; ++j) {
                if (sortedIndex[ranking.movies[i][j].id] === undefined) {
                    if (arr.length < ranking.movies[i].length) {
                        arr.push(ranking.movies[i][j].id);
                    }
                    if (movies.length < ranking.movies[i].length) {
                        movies.push(ranking.movies[i][j]);
                    }
                    sortedIndex[ranking.movies[i][j].id] = 0;
                }
                sortedIndex[ranking.movies[i][j].id] += j;
            }
        }
        var y = 1;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var ind = arr_1[_i];
            sortedIndex[ind] = Math.floor(sortedIndex[ind] / len) + y;
            --y;
        }
        this.showApplyAlert = true;
        setTimeout(function () {
            _this.showApplyAlert = false;
        }, 3000);
        var sortMovies = new Array(len).fill(0);
        for (var i = 0; i < len; ++i) {
            for (var j = i + 1; j < len; ++j) {
                if (sortedIndex[arr[i]] > sortedIndex[arr[j]]) {
                    var swap = sortedIndex[arr[i]];
                    sortedIndex[arr[i]] = sortedIndex[arr[j]];
                    sortedIndex[arr[j]] = swap;
                }
            }
        }
        var a = __spreadArrays(sortedIndex);
        // this.removeCollection(ranking, event);
    };
    RatingsComponent = __decorate([
        core_1.Component({
            selector: 'app-ratings',
            templateUrl: './ratings.component.html',
            styleUrls: ['./ratings.component.scss']
        })
    ], RatingsComponent);
    return RatingsComponent;
}());
exports.RatingsComponent = RatingsComponent;
