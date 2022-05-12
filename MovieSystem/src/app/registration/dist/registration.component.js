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
        this.user = { firstName: '', lastName: '', email: '', birthdate: '' };
    }
    RegistrationComponent.prototype.getDataFromStep1 = function (newUser) {
        this.user = newUser;
    };
    // private updateUserData1(data: UserStep1): void {
    //   this.user.firstname = data.firstName;
    //   this.user.lastname = data.lastName;
    //   this.user.email = data.email;
    //   this.user.birthdate = data.birthday;
    // }
    // private updateUserData2(data: UserStep2): void {
    //   this.user.username = data.username;
    //   this.user.password = data.password;
    //   this.user.repeatPassword = data.repeatPassword;
    // }
    RegistrationComponent.prototype.ngOnInit = function () {
        console.log('parent');
    };
    RegistrationComponent.prototype.ngOnChanges = function () {
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
