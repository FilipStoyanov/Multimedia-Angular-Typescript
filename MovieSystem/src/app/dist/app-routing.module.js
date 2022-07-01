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
var profile_component_1 = require("./profile/profile.component");
var common_1 = require("@angular/common");
var friends_component_1 = require("./friends/friends.component");
var about_us_component_1 = require("./about-us/about-us.component");
var movie_component_1 = require("./movie/movie.component");
var user_component_1 = require("./user/user.component");
var not_found_component_1 = require("./not-found/not-found.component");
var friend_preferences_component_1 = require("./friend-preferences/friend-preferences.component");
var ratings_component_1 = require("./ratings/ratings.component");
var terms_component_1 = require("./terms/terms.component");
var notRegisteredUser = [
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'movies', component: movies_component_1.MoviesComponent },
    { path: 'movie/:movieId', component: movie_component_1.MovieComponent },
    { path: 'collections', component: collection_component_1.CollectionComponent },
    { path: 'about', component: about_us_component_1.AboutUsComponent },
    { path: 'terms', component: terms_component_1.TermsComponent },
    { path: 'home', pathMatch: 'full', component: home_component_1.HomeComponent },
    { path: '404', component: not_found_component_1.NotFoundComponent },
    { path: '', redirectTo: 'home' },
    { path: '**', redirectTo: '404' },
];
var registeredUser = [
    { path: 'movies', component: movies_component_1.MoviesComponent },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'collections', component: collection_component_1.CollectionComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'friends', component: friends_component_1.FriendsComponent },
    { path: 'about', component: about_us_component_1.AboutUsComponent },
    { path: 'user/:userId', component: user_component_1.UserComponent },
    { path: 'movie/:movieId', component: movie_component_1.MovieComponent },
    { path: 'rateCollection', component: friend_preferences_component_1.FriendPreferencesComponent },
    { path: 'ratings', component: ratings_component_1.RatingsComponent },
    { path: 'terms', component: terms_component_1.TermsComponent },
    { path: 'home', pathMatch: 'full', component: home_component_1.HomeComponent },
    { path: '404', component: not_found_component_1.NotFoundComponent },
    { path: '', redirectTo: 'home' },
    { path: '**', redirectTo: '404' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(localStorage.getItem('user') ? registeredUser : notRegisteredUser), common_1.CommonModule],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
