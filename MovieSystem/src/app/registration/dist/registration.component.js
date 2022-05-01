"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistrationComponent = void 0;
var core_1 = require("@angular/core");
var stepper_1 = require("@angular/cdk/stepper");
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent() {
        this.user = { firstName: '', lastName: '', email: '', username: '', password: '', repeatPassword: '', birthday: '' };
    }
    RegistrationComponent.prototype.updateUserData1 = function (data) {
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.email = data.email;
        this.user.birthday = data.birthday;
    };
    RegistrationComponent.prototype.updateUserData2 = function (data) {
        this.user.username = data.username;
        this.user.password = data.password;
        this.user.repeatPassword = data.repeatPassword;
    };
    RegistrationComponent.prototype.ngOnInit = function () {
    };
    RegistrationComponent.prototype.ngOnChange = function () {
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-registration',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.scss'],
            providers: [
                {
                    provide: stepper_1.STEPPER_GLOBAL_OPTIONS,
                    useValue: { showError: true }
                },
            ]
        })
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
