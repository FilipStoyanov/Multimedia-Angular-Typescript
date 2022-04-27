"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var registration_component_1 = require("./registration/registration.component");
var movies_component_1 = require("./movies/movies.component");
var collection_component_1 = require("./collection/collection.component");
var reviewed_movies_component_1 = require("./reviewed-movies/reviewed-movies.component");
var profile_component_1 = require("./profile/profile.component");
var common_1 = require("@angular/common");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'movies', component: movies_component_1.MoviesComponent },
    { path: 'collections', component: collection_component_1.CollectionComponent },
    { path: 'reviews', component: reviewed_movies_component_1.ReviewedMoviesComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes), common_1.CommonModule],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
