"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Step1Component = void 0;
var core_1 = require("@angular/core");
var Step1Component = /** @class */ (function () {
    function Step1Component() {
        this.changedStep = new core_1.EventEmitter();
        this.changedUserData = new core_1.EventEmitter();
        this.data = { firstName: '', lastName: '', email: '', birthday: '' };
        this.validation = { firstName: true, lastName: true, email: true };
        this.countries = [
            'Bulgaria',
            'France',
            'Italy',
            'Germany',
            'Spain',
        ];
        this.nextBtn = {
            isAnchor: false,
            externalStyles: {
                color: '#ffffff',
                backgroundColor: 'red',
                width: '150px',
                fontSize: '20px'
            },
            text: 'Напред',
            nextBtn: true
        };
        this.backBtn = {
            isAnchor: false,
            externalStyles: {
                color: '#ffffff',
                backgroundColor: 'red',
                width: '150px',
                fontSize: '20px'
            },
            text: 'Назад',
            nextBtn: false
        };
    }
    Step1Component.prototype.nextStepValidation = function () {
        var _this = this;
        return new Promise(function () {
            _this.validation.firstName = _this.validateName(_this.data.firstName);
            _this.validation.lastName = _this.validateName(_this.data.lastName);
            _this.validation.email = _this.validateEmail(_this.data.email);
        });
    };
    Step1Component.prototype.validateName = function (name) {
        if (name.length >= 3 || name.length === 0) {
            return !/\d/.test(name);
        }
        return false;
    };
    Step1Component.prototype.validateEmail = function (email) {
        if (email.length >= 3 || email.length === 0) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        }
        return false;
    };
    Step1Component.prototype.goForward = function (stepper) {
        this.validation.firstName = this.data.firstName.length !== 0 ? this.validateName(this.data.firstName) : false;
        this.validation.lastName = this.data.lastName.length !== 0 ? this.validateName(this.data.lastName) : false;
        this.validation.email = this.data.email.length !== 0 ? this.validateEmail(this.data.email) : false;
        if (this.validation.firstName && this.validation.lastName && this.validation.email) {
            // this.step++;
            stepper.next();
            // this.changedStep.emit(this.step);
            this.changedUserData.emit(this.data);
        }
        else {
            this.validation.firstName = (this.validation.firstName === true);
            this.validation.lastName = (this.validation.lastName === true);
            this.validation.email = (this.validation.email === true);
        }
    };
    Step1Component.prototype.selectDate = function (event) {
        this.data.birthday = event.target.value;
        this.changedUserData.emit(this.data);
    };
    Step1Component.prototype.updateFirstName = function (newFirstName) {
        this.data.firstName = newFirstName;
        this.validation.firstName = this.validateName(this.data.firstName);
    };
    Step1Component.prototype.updateLastName = function (newLastName) {
        this.data.lastName = newLastName;
        this.validation.lastName = this.validateName(this.data.lastName);
    };
    Step1Component.prototype.updateEmail = function (newEmail) {
        this.data.email = newEmail;
        this.validation.email = this.validateEmail(this.data.email);
    };
    Step1Component.prototype.ngOnInit = function () {
        this.data.firstName = this.userData.firstName;
        this.data.lastName = this.userData.lastName;
        this.userData.email = this.userData.email;
        this.userData.birthday = this.userData.birthday;
    };
    Step1Component.prototype.ngOnChange = function () {
    };
    __decorate([
        core_1.Input()
    ], Step1Component.prototype, "stepper");
    __decorate([
        core_1.Output()
    ], Step1Component.prototype, "changedStep");
    __decorate([
        core_1.Output()
    ], Step1Component.prototype, "changedUserData");
    __decorate([
        core_1.Input()
    ], Step1Component.prototype, "userData");
    __decorate([
        core_1.Output()
    ], Step1Component.prototype, "data");
    Step1Component = __decorate([
        core_1.Component({
            selector: 'app-step1',
            templateUrl: './step1.component.html',
            styleUrls: ['./step1.component.scss']
        })
    ], Step1Component);
    return Step1Component;
}());
exports.Step1Component = Step1Component;
