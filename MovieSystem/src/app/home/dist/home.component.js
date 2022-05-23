"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(store, userService) {
        var _this = this;
        this.store = store;
        this.userService = userService;
        this.linkConfig = {
            isAnchor: true,
            externalStyles: {
                color: '#ffffff'
            },
            text: 'Registration',
            link: '/registration'
        };
        this.userData = { firstname: '', lastname: '', email: '', username: '', password: '', _id: '', friends: [] };
        this.friends = [];
        this.showRegistrationButton = false;
        this.user$ = store.select('user');
        this.user$.subscribe(function (user) {
            _this.userData.username = user.username;
        });
        if (JSON.parse(localStorage.getItem('user'))) {
            this.showRegistrationButton = true;
        }
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
