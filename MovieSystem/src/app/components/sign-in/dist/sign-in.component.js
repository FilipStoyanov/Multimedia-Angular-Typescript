"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignInComponent = void 0;
var core_1 = require("@angular/core");
var SignInComponent = /** @class */ (function () {
    function SignInComponent(modalService) {
        this.modalService = modalService;
    }
    SignInComponent.prototype.ngOnInit = function () {
    };
    SignInComponent.prototype.openModal = function (content) {
        this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    };
    SignInComponent.prototype.logIn = function () {
        console.log(this.emailInput);
        console.log(this.passwordInput);
    };
    SignInComponent.prototype.onChangeEmail = function (event) {
        this.emailInput = event.target.value;
    };
    SignInComponent.prototype.onChangePassword = function (event) {
        this.passwordInput = event.target.value;
    };
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'app-sign-in',
            templateUrl: './sign-in.component.html',
            styleUrls: ['./sign-in.component.scss']
        })
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
