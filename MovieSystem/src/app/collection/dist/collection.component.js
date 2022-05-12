"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CollectionComponent = exports.MyCollection = void 0;
var core_1 = require("@angular/core");
var MyCollection = /** @class */ (function () {
    function MyCollection(collectionName) {
        this.collectionName = collectionName;
        this.name = collectionName;
    }
    return MyCollection;
}());
exports.MyCollection = MyCollection;
var CollectionComponent = /** @class */ (function () {
    function CollectionComponent(collectionService) {
        var _this = this;
        this.collectionService = collectionService;
        this.userCollections = [];
        this.userId = JSON.parse(localStorage.getItem('user'))._id;
        this.movieUrl = '/movie/';
        this.collectionService.getAllForUser(this.userId).subscribe(function (result) {
            _this.userCollections = result;
        });
    }
    CollectionComponent.prototype.ngOnInit = function () {
    };
    CollectionComponent.prototype.removeCollection = function (collection, event) {
        event.preventDefault();
        this.collectionService.removeCollection(collection._id).subscribe();
        window.location.reload();
    };
    CollectionComponent.prototype.removeMovie = function (collection, movie) {
        this.collectionService.updateCollection(collection._id, movie.titleEn, movie.titleBg, movie.image, movie.year, movie._id).subscribe();
        var ind = this.userCollections.findIndex(function (obj) { return obj._id === collection._id; });
        var movieInd = this.userCollections[ind].movies.findIndex(function (obj) { return obj.id === movie._id; });
        this.userCollections[ind].movies.splice(movieInd, 1);
    };
    CollectionComponent = __decorate([
        core_1.Component({
            selector: 'app-collection',
            templateUrl: './collection.component.html',
            styleUrls: ['./collection.component.scss']
        })
    ], CollectionComponent);
    return CollectionComponent;
}());
exports.CollectionComponent = CollectionComponent;
