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
        this.filteredFriends = [];
        this.friendIds = [];
        this.friendNames = [];
        this.friendsUsername = [];
        this.showAddAlert = false;
        this.showRemoveAlert = false;
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            var us = JSON.parse(localStorage.getItem('user'));
            if ('friends' in us) {
                this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
            }
            for (var _i = 0, _a = this.friendsUsername; _i < _a.length; _i++) {
                var u = _a[_i];
                this.friendIds.push(u.id);
                this.friendNames.push(u.username);
            }
        }
        this.userService.getUsers().subscribe(function (data) {
            _this.users = data.data;
            _this.filteredUser = data.data.filter(function (user) { return _this.friendIds.indexOf(user._id) === -1
                && user._id !== JSON.parse(localStorage.getItem('user'))._id; });
            _this.friends = data.data;
            // tslint:disable-next-line:max-line-length
            _this.filteredFriends = data.data.filter(function (user) { return _this.friendIds.indexOf(user._id) > -1
                && user.id !== JSON.parse(localStorage.getItem('user'))._id; });
        });
        if (JSON.parse(localStorage.getItem('user'))) {
            this.username = JSON.parse(localStorage.getItem('user')).username;
            this.role = JSON.parse(localStorage.getItem('user')).role;
        }
        this.searchValue = '';
        this.navUrl = '/user/';
    }
    FriendsComponent.prototype.ngOnInit = function () {
        console.log('here');
    };
    FriendsComponent.prototype.ngAfterContentInit = function () {
    };
    FriendsComponent.prototype.ngOnDestroy = function () {
        console.log(this.filteredFriends);
        this.filteredFriends = null;
        this.filteredUser = null;
    };
    FriendsComponent.prototype.isFriend = function (user) {
        this.currentUser.friends.forEach(function (u) {
            if (u.id === user.id) {
                return true;
            }
        });
        return false;
    };
    FriendsComponent.prototype.routeToUserProfile = function (friend, event) {
        this.navigationUrl = "/user/" + friend._id;
        this.userName = friend._id;
        localStorage.setItem('userName', this.userName);
        this.userId = friend._id;
    };
    FriendsComponent.prototype.filterUsers = function (event) {
        var _this = this;
        this.searchValue = event.target.value;
        if (this.searchValue === '') {
            this.filteredUser = this.users.filter(function (user) { return _this.friendIds.indexOf(user._id) === -1
                && user._id !== JSON.parse(localStorage.getItem('user'))._id; });
        }
        else {
            this.filteredUser = this.users.filter(function (user) { return _this.friendIds.indexOf(user._id) === -1
                && user._id !== JSON.parse(localStorage.getItem('user'))._id
                && user.username.toLowerCase().indexOf(_this.searchValue.toLowerCase()) > -1; });
        }
        this.notFoundUser = (this.filteredUser.length === 0);
    };
    FriendsComponent.prototype.filterFriends = function (event) {
        var _this = this;
        this.searchValueFriend = event.target.value;
        if (this.searchValueFriend === '') {
            this.filteredFriends = __spreadArrays(this.users.filter(function (user) { return _this.friendIds.indexOf(user._id) > -1
                && user._id !== JSON.parse(localStorage.getItem('user'))._id; }));
        }
        else {
            this.filteredFriends = __spreadArrays(this.users.filter(function (user) { return _this.friendIds.indexOf(user._id) > -1
                && user._id !== JSON.parse(localStorage.getItem('user'))._id
                && user.username.toLowerCase().indexOf(_this.searchValueFriend.toLowerCase()) > -1; }));
        }
        if (this.searchValueFriend.length > 0) {
            this.notFoundFriend = (this.filteredFriends.length === 0);
        }
        else {
            this.notFoundFriend = false;
        }
    };
    FriendsComponent.prototype.removeFriend = function (friend, event) {
        event.preventDefault();
        event.stopPropagation();
        var fr = { username: friend.username, id: friend._id, image: friend.image };
        var user = JSON.parse(localStorage.getItem('user'));
        this.userService.addFriend(user._id, fr).subscribe();
        var indFriends = -1;
        user.friends.forEach(function (u, i) {
            if (u.id === fr.id) {
                indFriends = i;
            }
        });
        console.log(indFriends);
        if (indFriends > -1) {
            this.filteredFriends.splice(indFriends, 1);
            user.friends.splice(indFriends, 1);
            localStorage.setItem('user', JSON.stringify(user));
        }
        window.location.reload();
    };
    FriendsComponent.prototype.addFriend = function (friend, event) {
        var _this = this;
        event.preventDefault();
        var fr = { username: friend.username, id: friend._id, image: '' };
        var user = JSON.parse(localStorage.getItem('user'));
        this.userService.addFriend(user._id, fr).subscribe();
        var index = -1;
        this.filteredUser.forEach(function (u, i) {
            if (u._id === friend._id) {
                index = i;
            }
        });
        console.log(index);
        this.filteredUser.splice(index, 1);
        var ind = this.friendIds.indexOf(fr.id);
        if (ind === -1) {
            user.friends.push(fr);
            this.filteredFriends.push(friend);
            localStorage.setItem('user', JSON.stringify(user));
        }
        this.showAddAlert = true;
        setTimeout(function () {
            _this.showAddAlert = false;
        }, 3000);
    };
    FriendsComponent.prototype.onTabChanged = function (event) {
    };
    FriendsComponent.prototype.removeUser = function (user, event) {
        event.preventDefault();
        var ind = this.filteredUser.indexOf(user);
        if (ind > -1) {
            this.filteredUser.splice(ind, 1);
        }
        this.userService.deleteUser(user).subscribe({});
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
