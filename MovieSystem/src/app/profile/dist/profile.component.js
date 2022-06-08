"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(userService) {
        this.userService = userService;
        this.genres = [
            'Action',
            'Comedy',
            'Animations',
            'Drama',
            'Fantasy',
            'Horror',
            'Science fiction',
            'Western',
        ];
        this.user = JSON.parse(localStorage.getItem('user'));
        this.editedUser = JSON.parse(localStorage.getItem('user'));
        this.changedValue = [true, true, true, true, true, true, true, true];
        this.showGenreInput = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent.prototype.uploadImage = function () {
        document.getElementById('imageUpload').click();
    };
    ProfileComponent.prototype.removeImage = function () {
        this.editedUser.image = '';
        this.changedValue[7] = (this.editedUser.image === this.user.image);
    };
    ProfileComponent.prototype.onBtnClick = function () {
        if (this.editedUser.image === '') {
            this.uploadImage();
        }
        else {
            this.removeImage();
        }
    };
    ProfileComponent.prototype.onChangeUsername = function (event) {
        this.editedUser.username = event.target.value;
        this.changedValue[0] = (this.editedUser.username === this.user.username);
    };
    ProfileComponent.prototype.onChangeFirstname = function (event) {
        this.editedUser.firstname = event.target.value;
        this.changedValue[1] = (this.editedUser.firstname === this.user.firstname);
    };
    ProfileComponent.prototype.onChangeLastname = function (event) {
        this.editedUser.lastname = event.target.value;
        this.changedValue[2] = (this.editedUser.lastname === this.user.lastname);
    };
    ProfileComponent.prototype.onChangeEmail = function (event) {
        this.editedUser.email = event.target.value;
        this.changedValue[3] = (this.editedUser.email === this.user.email);
    };
    ProfileComponent.prototype.onChangeBirthday = function (event) {
        this.editedUser.birthdate = event.target.value;
        this.changedValue[4] = (this.editedUser.birthdate === this.user.birthdate);
    };
    ProfileComponent.prototype.onChangePassword = function (event) {
        this.editedUser.password = event.target.value;
        this.changedValue[5] = (this.editedUser.password === this.user.password);
    };
    ProfileComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) {
                _this.editedUser.image = reader_1.result;
                _this.changedValue[7] = (_this.editedUser.image === _this.user.image);
            };
            reader_1.readAsDataURL(file);
        }
    };
    ProfileComponent.prototype.removeGenre = function (genre) {
        var ind = this.editedUser.genres.indexOf(genre);
        if (ind > -1) {
            this.editedUser.genres.splice(ind, 1);
            this.changedValue[6] = (this.editedUser.genres.toString() === this.user.genres.toString());
        }
    };
    ProfileComponent.prototype.addGenre = function (genre) {
        var ind = this.user.genres.indexOf(genre);
        if (ind === -1) {
            this.editedUser.genres.push(genre);
            this.changedValue[6] = (this.editedUser.genres.toString() === this.user.genres.toString());
        }
    };
    ProfileComponent.prototype.showInput = function () {
        this.showGenreInput = true;
    };
    ProfileComponent.prototype.saveAccount = function () {
        this.userService.editUser(this.user.username, this.editedUser).subscribe();
        localStorage.setItem('user', JSON.stringify(this.editedUser));
        window.location.reload();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
