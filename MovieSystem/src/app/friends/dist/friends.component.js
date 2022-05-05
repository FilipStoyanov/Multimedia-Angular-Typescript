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
exports.FriendsComponent = void 0;
var core_1 = require("@angular/core");
var FriendsComponent = /** @class */ (function () {
    function FriendsComponent(userService, router) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        if (localStorage.getItem('user')) {
            this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
        }
        for (var _i = 0, _a = this.friendsUsername; _i < _a.length; _i++) {
            var friendName = _a[_i];
            this.userService.getUser(friendName).subscribe(function (data) {
                _this.friends.push(data);
            });
        }
        this.userService.getUsers().subscribe(function (data) {
            _this.users = data.data;
            _this.filteredUser = data.data;
        });
        this.username = JSON.parse(localStorage.getItem('user')).username;
        this.searchValue = '';
    }
    FriendsComponent.prototype.ngOnInit = function () {
    };
    FriendsComponent.prototype.ngAfterContentInit = function () {
    };
    FriendsComponent.prototype.get = function () {
    };
    FriendsComponent.prototype.routeToUserProfile = function (e) {
        this.userName = e.currentTarget.name;
        localStorage.setItem('userName', this.userName);
        this.userId = e.currentTarget.id;
        this.router.navigate(["/user/" + this.userId]);
    };
    FriendsComponent.prototype.filterUsers = function (event) {
        var _this = this;
        this.searchValue = event.target.value;
        if (this.searchValue === '') {
            this.filteredUser = __spreadArrays(this.users);
        }
        else {
            this.filteredUser = this.users.filter(function (user) { return user.username.indexOf(_this.searchValue) > -1; });
        }
    };
    FriendsComponent.prototype.filterFriends = function (event) {
    };
    FriendsComponent = __decorate([
        core_1.Component({
            selector: 'app-friends',
            templateUrl: './friends.component.html',
            styleUrls: ['./friends.component.scss']
        })
    ], FriendsComponent);
    return FriendsComponent;
}());
exports.FriendsComponent = FriendsComponent;
