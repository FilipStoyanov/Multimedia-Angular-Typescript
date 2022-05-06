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
exports.FriendsComponent = exports.User = void 0;
var core_1 = require("@angular/core");
var User = /** @class */ (function () {
    function User(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
        this.friends = user.friends;
        this.image = user.image;
        this.role = user.role;
        this.birthdate = user.birthdate;
        this.id = user._id;
    }
    return User;
}());
exports.User = User;
var FriendsComponent = /** @class */ (function () {
    function FriendsComponent(userService, router) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.filteredFriends = [];
        this.showAddAlert = false;
        this.showRemoveAlert = false;
        if (localStorage.getItem('user')) {
            this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
        }
        this.userService.getUsers().subscribe(function (data) {
            _this.users = data.data;
            _this.filteredUser = data.data.filter(function (user) { return _this.friendsUsername.indexOf(user.username) === -1; });
            _this.friends = data.data;
            _this.filteredFriends = data.data.filter(function (user) { return _this.friendsUsername.indexOf(user.username) > -1; });
        });
        this.username = JSON.parse(localStorage.getItem('user')).username;
        this.searchValue = '';
    }
    FriendsComponent.prototype.ngOnInit = function () {
    };
    FriendsComponent.prototype.ngAfterContentInit = function () {
    };
    FriendsComponent.prototype.ngOnDestroy = function () {
        this.filteredFriends = [];
        this.filteredUser = [];
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
            this.filteredUser = this.users.filter(function (user) { return _this.friendsUsername.indexOf(user.username) === -1; });
        }
        else {
            this.filteredUser = this.filteredUser.filter(function (user) { return user.username.indexOf(_this.searchValue) > -1; });
        }
        this.notFoundUser = (this.filteredUser.length === 0);
    };
    FriendsComponent.prototype.filterFriends = function (event) {
        var _this = this;
        this.searchValueFriend = event.target.value;
        if (this.searchValueFriend === '') {
            this.filteredFriends = __spreadArrays(this.users.filter(function (user) { return _this.friendsUsername.indexOf(user.username) > -1; }));
        }
        else {
            this.filteredFriends = __spreadArrays(this.users.filter(function (user) { return _this.friendsUsername.indexOf(user.username) > -1
                && user.username.indexOf(_this.searchValueFriend) > -1; }));
        }
        if (this.searchValueFriend.length > 0) {
            this.notFoundFriend = (this.filteredFriends.length === 0);
        }
        else {
            this.notFoundFriend = false;
        }
    };
    FriendsComponent.prototype.removeFriend = function (friend, event) {
        event.stopPropagation();
        var user = JSON.parse(localStorage.getItem('user'));
        this.userService.addFriend(user.username, friend.username).subscribe();
        var ind = user.friends.indexOf(friend.username);
        if (ind > -1) {
            user.friends.splice(ind, 1);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
        }
    };
    FriendsComponent.prototype.addFriend = function (friend, event) {
        var _this = this;
        event.stopImmediatePropagation();
        this.filteredFriends = [];
        var user = JSON.parse(localStorage.getItem('user'));
        this.userService.addFriend(user.username, friend.username).subscribe();
        var ind = user.friends.indexOf(friend.username);
        if (ind === -1) {
            user.friends.push(friend.username);
            localStorage.setItem('user', JSON.stringify(user));
        }
        this.showAddAlert = true;
        setTimeout(function () {
            _this.showAddAlert = false;
        }, 3000);
    };
    FriendsComponent.prototype.onTabChanged = function (event) {
        var _this = this;
        this.friendInput.nativeElement.value = '';
        this.userInput.nativeElement.value = '';
        if (localStorage.getItem('user')) {
            this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
        }
        this.userService.getUsers().subscribe(function (data) {
            _this.users = data.data;
            _this.filteredUser = data.data.filter(function (user) { return _this.friendsUsername.indexOf(user.username) === -1; });
            _this.friends = data.data;
            _this.filteredFriends = data.data.filter(function (user) { return _this.friendsUsername.indexOf(user.username) > -1; });
        });
        console.log(this.filteredFriends);
        this.username = JSON.parse(localStorage.getItem('user')).username;
        this.searchValue = '';
    };
    __decorate([
        core_1.ViewChild('friendInput')
    ], FriendsComponent.prototype, "friendInput");
    __decorate([
        core_1.ViewChild('userInput')
    ], FriendsComponent.prototype, "userInput");
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
