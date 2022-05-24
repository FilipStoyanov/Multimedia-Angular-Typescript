"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FriendPreferencesComponent = void 0;
var core_1 = require("@angular/core");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var FriendPreferencesComponent = /** @class */ (function () {
    // movies: Array<Movie[]>;
    function FriendPreferencesComponent(preferenceService, rankingService, notificationService) {
        var _this = this;
        this.preferenceService = preferenceService;
        this.rankingService = rankingService;
        this.notificationService = notificationService;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.prefData = [];
        this.showSendAlert = false;
        // this.movies = [];
        this.preferenceService.getAllPreferencesByUserId(this.user._id).subscribe(function (data) {
            _this.prefData = data.data;
            //  console.log(this.prefData);
            //  for (const item of this.prefData){
            //    this.movies.push(item.movies);
            //  }
            //  console.log(this.movies);
        });
    }
    FriendPreferencesComponent.prototype.drop = function (movieList, event) {
        drag_drop_1.moveItemInArray(movieList, event.previousIndex, event.currentIndex);
    };
    FriendPreferencesComponent.prototype.sendPreference = function (preference, e) {
        var _this = this;
        this.showSendAlert = true;
        var films = [];
        films.push(preference.movies);
        var arrIds = [this.user._id];
        var arrUsernames = [this.user.username];
        var ranking = { senderId: arrIds, senderUsername: arrUsernames, movies: films,
            collectionId: preference.collectionId, collectionName: preference.collectionName, receiver: preference.senderId, seen: false };
        this.rankingService.updateRanking(ranking).subscribe({});
        var notification = { senderId: this.user._id, senderUsername: this.user.username,
            receiver: preference.senderId, movieId: 'none', type: 'ranking' };
        this.notificationService.addNotification(notification).subscribe({});
        this.deletePreference(preference, e);
        setTimeout(function () {
            _this.showSendAlert = false;
        }, 4000);
    };
    FriendPreferencesComponent.prototype.deletePreference = function (pref, e) {
        var reqObject = { senderId: pref.senderId, senderUsername: pref.senderUsername, movies: pref.movies,
            _id: pref._id,
            receivers: pref.receivers, collectionId: pref.collectionId, collectionName: pref.collectionName, userId: this.user._id };
        this.preferenceService.deletePreference(reqObject).subscribe({});
        var ind = this.prefData.indexOf(pref);
        this.prefData.splice(ind, 1);
    };
    FriendPreferencesComponent.prototype.ngOnInit = function () {
    };
    FriendPreferencesComponent = __decorate([
        core_1.Component({
            selector: 'app-friend-preferences',
            templateUrl: './friend-preferences.component.html',
            styleUrls: ['./friend-preferences.component.scss']
        })
    ], FriendPreferencesComponent);
    return FriendPreferencesComponent;
}());
exports.FriendPreferencesComponent = FriendPreferencesComponent;
