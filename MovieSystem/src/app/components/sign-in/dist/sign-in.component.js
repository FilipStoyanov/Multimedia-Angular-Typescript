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
    function SignInComponent(modalService, userService, userDataService, router, store) {
        this.modalService = modalService;
        this.userService = userService;
        this.userDataService = userDataService;
        this.router = router;
        this.store = store;
        this.user = { token: '', username: '', password: '' };
        this.invalidCredentials = false;
    }
    SignInComponent.prototype.ngOnInit = function () {
    };
    SignInComponent.prototype.openModal = function (content) {
        this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    };
    SignInComponent.prototype.logIn = function () {
        var _this = this;
        this.userDataService.getUser(this.user.username).subscribe(function (res) {
            if (res === null) {
                console.log('invalid username or password');
                _this.invalidCredentials = true;
            }
            else if ('password' in res && res.password !== _this.user.password) {
                console.log('invalid password');
                _this.invalidCredentials = true;
            }
            else if (res && 'password' in res && res.password === _this.user.password) {
                console.log(res);
                _this.invalidCredentials = false;
                localStorage.setItem('user', JSON.stringify(res));
                _this.router.navigate(["/"]).then(function () { return window.location.reload(); });
            }
        });
    };
    // this.store.dispatch(addUser({user: data}));
    SignInComponent.prototype.onChangeEmail = function (event) {
        this.emailInput = event.target.value;
        this.user.username = this.emailInput;
    };
    SignInComponent.prototype.onChangePassword = function (event) {
        this.passwordInput = event.target.value;
        this.user.password = this.passwordInput;
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
