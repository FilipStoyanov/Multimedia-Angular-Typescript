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
    function CollectionComponent(collectionService, preferenceService) {
        var _this = this;
        this.collectionService = collectionService;
        this.preferenceService = preferenceService;
        this.userCollections = [];
        this.userId = JSON.parse(localStorage.getItem('user'))._id;
        this.movieUrl = '/movie/';
        this.user = JSON.parse(localStorage.getItem('user'));
        this.friends = [];
        if (localStorage.getItem('show')) {
            this.showSendIcon = localStorage.getItem('show');
        }
        else {
            this.showSendIcon = 'true';
        }
        for (var _i = 0, _a = this.user.friends; _i < _a.length; _i++) {
            var fr = _a[_i];
            this.friends.push(fr.id);
        }
        this.collectionService.getAllForUser(this.userId).subscribe(function (result) {
            _this.userCollections = result;
        });
    }
    CollectionComponent.prototype.ngOnInit = function () {
    };
    CollectionComponent.prototype.sendCollection = function (collection, event) {
        var _this = this;
        event.stopPropagation();
        var preference = { senderId: this.user._id, senderUsername: this.user.username, movies: collection.movies,
            collectionId: collection._id, collectionName: collection.name, receivers: this.friends };
        this.preferenceService.addPreference(preference).subscribe({});
        this.showSendAlert = true;
        setTimeout(function () {
            _this.showSendAlert = false;
        }, 3000);
        localStorage.setItem('show', 'false');
        this.showSendIcon = 'false';
    };
    CollectionComponent.prototype.removeCollection = function (collection, event) {
        event.stopPropagation();
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
