"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var UserComponent = /** @class */ (function () {
    function UserComponent(userService, router) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.friendIds = [];
        this.us = JSON.parse(localStorage.getItem('user'));
        this.user = { username: '', firstname: '', lastname: '', email: '', birthdate: '', password: '' };
        this.userName = localStorage.getItem('userName');
        this.isFriend = false;
        this.showAlert = false;
        this.friends = JSON.parse(localStorage.getItem('user')).friends;
        this.friends.map(function (u) { return _this.friendIds.push(u.id); });
        this.userName = this.router.snapshot.paramMap.get('userId');
        this.userService.getUser(this.userName).subscribe(function (data) {
            if (!data.hasOwnProperty('birthdate')) {
                data.birthdate = '-';
            }
            if (!data.hasOwnProperty('username')) {
                data.username = '';
            }
            _this.isFriend = (_this.friendIds.indexOf(data._id) > -1);
            _this.user = data;
        });
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.getEmail = function () {
        var result;
        result += 'mailto:';
        result += this.user.email;
        return result;
    };
    UserComponent.prototype.toggleFriend = function () {
        var _this = this;
        this.isFriend = !this.isFriend;
        this.showAlert = true;
        var friend = { username: this.user.username, id: this.user._id, image: this.user.image };
        var indFriends = -1;
        this.us.friends.forEach(function (u, i) {
            if (u.id === _this.user._id) {
                indFriends = i;
            }
        });
        if (indFriends > -1) {
            this.us.friends.splice(indFriends, 1);
        }
        else {
            this.us.friends.push(friend);
        }
        localStorage.setItem('user', JSON.stringify(this.us));
        console.log(localStorage.getItem('user'));
        this.userService.addFriend(this.us._id, friend).subscribe();
        setTimeout(function () {
            _this.showAlert = false;
        }, 3000);
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.scss']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
