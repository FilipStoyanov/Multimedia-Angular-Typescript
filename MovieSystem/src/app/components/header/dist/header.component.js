"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(store, renderer, router, notificationService) {
        var _this = this;
        this.store = store;
        this.renderer = renderer;
        this.router = router;
        this.notificationService = notificationService;
        this.links = ['home', 'movies', 'collections', 'rateCollection', 'profile', 'ratings', "/friends"];
        this.userData = { firstname: '', lastname: '', email: '', username: '', password: '', image: '', _id: '' };
        this.user$ = store.select('user');
        this.notifications = [];
        this.user$.subscribe(function (user) {
            _this.userData.username = user.username;
        });
        var parseUser;
        if (JSON.parse(localStorage.getItem('user'))) {
            this.showNotRegistered = false;
            parseUser = JSON.parse(localStorage.getItem('user'));
            this.notificationService.getAllNotificationsByUserId(parseUser._id).subscribe(function (data) {
                _this.notifications = data.data;
                _this.notSeenNotifications = data.data.filter(function (note) { return note.seen === false; });
            });
            this.userData.username = parseUser.username;
        }
        else {
            this.showNotRegistered = true;
        }
        if (parseUser && 'image' in parseUser) {
            this.imageData = parseUser.image;
        }
        this.isShownProfileMenu = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unlistener = this.renderer.listen('document', 'click', function (event) {
            if (event.target.id !== 'profileText' && event.target.id !== 'arrowDown' && event.target.id !== 'arrowUp' &&
                event.target.id !== 'profileImage') {
                _this.isShownProfileMenu = false;
            }
        });
    };
    HeaderComponent.prototype.ngOnChanges = function () {
        this.imageData = JSON.parse(localStorage.getItem('user')).image;
    };
    HeaderComponent.prototype.toggleProfileMenu = function () {
        this.isShownProfileMenu = !this.isShownProfileMenu;
    };
    HeaderComponent.prototype.returnRouterLink = function (notification) {
        var res;
        if (notification.type === 'review') {
            res = '/movie/' + notification.movieId;
        }
        else if (notification.type === 'ranking') {
            res = '/ratings';
        }
        return res;
    };
    HeaderComponent.prototype.readNotification = function (notification) {
        notification.seen = true;
        var ind = this.notSeenNotifications.indexOf(notification);
        this.notSeenNotifications.splice(ind, 1);
        this.notificationService.readNotification(notification).subscribe({});
        var ind2 = this.notifications.indexOf(notification);
        this.notifications.splice(ind2, 1);
        this.notificationService.removeNotification(notification).subscribe({});
    };
    HeaderComponent.prototype.removeNotification = function (notification, event) {
        event.stopPropagation();
        var ind1 = this.notSeenNotifications.indexOf(notification);
        this.notSeenNotifications.splice(ind1, 1);
        var ind2 = this.notifications.indexOf(notification);
        this.notifications.splice(ind2, 1);
        this.notificationService.removeNotification(notification).subscribe({});
    };
    HeaderComponent.prototype.logOut = function () {
        this.router.navigate(["/"]).then(function () { return window.location.reload(); });
        localStorage.clear();
    };
    HeaderComponent.prototype.goToFriends = function () {
        this.router.navigate(["/friends"]).then(function () { return window.location.reload(); });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
