"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var baseURL = 'http://localhost:8080/api/users';
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.addUser = function (newUser) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(newUser);
        return this.http.post(baseURL, body, { headers: headers });
    };
    UserService.prototype.getUsers = function () {
        return this.http.get(baseURL);
    };
    UserService.prototype.getUser = function (username) {
        return this.http.get(baseURL + ("/" + username));
    };
    UserService.prototype.getUserByEmail = function (email) {
        return this.http.get(baseURL + ("/" + email));
    };
    UserService.prototype.editUser = function (username, editedUser) {
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify(editedUser);
        return this.http.patch(baseURL + ("/" + username), body, { headers: headers });
    };
    UserService.prototype.addFriend = function (username, friendName) {
        this.user = JSON.parse(localStorage.getItem('user'));
        var findIndex = this.user.friends.indexOf(friendName);
        if (findIndex === -1) {
            this.user.friends.push(friendName);
        }
        else {
            this.user.friends.splice(findIndex, 1);
        }
        localStorage.setItem('user', JSON.stringify(this.user));
        var headers = { 'content-type': 'application/json' };
        var body = JSON.stringify({ friend: friendName });
        return this.http.put(baseURL + ("/" + username), body, { headers: headers });
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
