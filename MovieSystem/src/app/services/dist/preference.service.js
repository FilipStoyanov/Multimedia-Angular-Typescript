"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PreferenceService = void 0;
var core_1 = require("@angular/core");
var baseUrl = 'http://localhost:8080/api/preferences';
var PreferenceService = /** @class */ (function () {
    function PreferenceService(http, router) {
        this.http = http;
        this.router = router;
    }
    PreferenceService.prototype.getAll = function () {
        return this.http.get(baseUrl);
    };
    PreferenceService.prototype.getAllPreferencesByUserId = function (userId) {
        return this.http.get(baseUrl + ("/user/" + userId));
    };
    PreferenceService.prototype.addPreference = function (preference) {
        var body = JSON.stringify(preference);
        var headers = { 'content-type': 'application/json' };
        return this.http.post(baseUrl, body, { headers: headers });
    };
    PreferenceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PreferenceService);
    return PreferenceService;
}());
exports.PreferenceService = PreferenceService;
