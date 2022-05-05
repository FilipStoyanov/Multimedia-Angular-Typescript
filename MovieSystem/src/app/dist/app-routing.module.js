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
var friends_component_1 = require("./friends/friends.component");
var about_us_component_1 = require("./about-us/about-us.component");
var movie_component_1 = require("./movie/movie.component");
var user_component_1 = require("./user/user.component");
var notRegisteredUser = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'movies', component: movies_component_1.MoviesComponent },
    { path: 'collections', component: collection_component_1.CollectionComponent },
    { path: 'about', component: about_us_component_1.AboutUsComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'user/:userId', component: user_component_1.UserComponent },
    { path: 'friends', component: friends_component_1.FriendsComponent },
    { path: 'movie/:movieId', component: movie_component_1.MovieComponent },
];
var registeredUser = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'movies', component: movies_component_1.MoviesComponent },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'collections', component: collection_component_1.CollectionComponent },
    { path: 'reviews', component: reviewed_movies_component_1.ReviewedMoviesComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'friends', component: friends_component_1.FriendsComponent },
    { path: 'about', component: about_us_component_1.AboutUsComponent },
    { path: 'user/:userId', component: user_component_1.UserComponent },
    { path: 'movie', component: movie_component_1.MovieComponent },
];
var UserRole;
(function (UserRole) {
    UserRole[UserRole["admin"] = 0] = "admin";
    UserRole[UserRole["registeredUser"] = 1] = "registeredUser";
    UserRole[UserRole["notRegisteredUser"] = 2] = "notRegisteredUser";
})(UserRole || (UserRole = {}));
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(localStorage.getItem('userId') ? registeredUser : notRegisteredUser), common_1.CommonModule],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
