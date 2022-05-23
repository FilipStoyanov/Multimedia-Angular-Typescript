"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationService = void 0;
var core_1 = require("@angular/core");
var baseUrl = 'http://localhost:8080/api/notification';
var NotificationService = /** @class */ (function () {
    function NotificationService(http, router) {
        this.http = http;
        this.router = router;
    }
    NotificationService.prototype.getAll = function () {
        return this.http.get(baseUrl);
    };
    NotificationService.prototype.getAllNotificationsByUserId = function (userId) {
        return this.http.get(baseUrl + ("/user/" + userId));
    };
    NotificationService.prototype.addNotification = function (notification) {
        var body = JSON.stringify(notification);
        var headers = { 'content-type': 'application/json' };
        return this.http.post(baseUrl, body, { headers: headers });
    };
    NotificationService.prototype.readNotification = function (notification) {
        var body = JSON.stringify(notification);
        var headers = { 'content-type': 'application/json' };
        return this.http.patch(baseUrl + ("/" + notification._id), body, { headers: headers });
    };
    NotificationService.prototype.removeNotification = function (notification) {
        return this.http["delete"](baseUrl + ("/" + notification._id));
    };
    NotificationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
