"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var default_button_component_1 = require("./components/common/default-button/default-button.component");
var header_component_1 = require("./components/header/header.component");
var footer_component_1 = require("./components/footer/footer.component");
var registration_component_1 = require("./registration/registration.component");
var default_input_component_1 = require("./components/common/default-input/default-input.component");
var movies_component_1 = require("./movies/movies.component");
var collection_component_1 = require("./collection/collection.component");
var reviewed_movies_component_1 = require("./reviewed-movies/reviewed-movies.component");
var profile_component_1 = require("./profile/profile.component");
var default_select_component_1 = require("./components/common/default-select/default-select.component");
var step1_component_1 = require("./registration/step1/step1.component");
var step2_component_1 = require("./registration/step2/step2.component");
var carousel_component_1 = require("./components/common/carousel/carousel.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var http_1 = require("@angular/common/http");
var movie_card_component_1 = require("./components/movie-card/movie-card.component");
var movie_select_component_1 = require("./movies/movie-select/movie-select.component");
var movie_search_component_1 = require("./movies/movie-search/movie-search.component");
var accordion_component_1 = require("./components/common/accordion/accordion.component");
var sort_button_component_1 = require("./components/common/sort-button/sort-button.component");
var default_checkbox_component_1 = require("./components/common/default-checkbox/default-checkbox.component");
var ng_bootstrap_2 = require("@ng-bootstrap/ng-bootstrap");
var stepper_1 = require("@angular/material/stepper");
var progress_bar_1 = require("@angular/material/progress-bar");
var form_field_1 = require("@angular/material/form-field");
var step3_component_1 = require("./registration/step3/step3.component");
var snack_bar_1 = require("@angular/material/snack-bar");
var store_1 = require("@ngrx/store");
var user_reducer_1 = require("./reducers/user.reducer");
var friends_component_1 = require("./friends/friends.component");
var about_us_component_1 = require("./about-us/about-us.component");
var icon_1 = require("@angular/material/icon");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                default_button_component_1.DefaultButtonComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                registration_component_1.RegistrationComponent,
                default_input_component_1.DefaultInputComponent,
                movies_component_1.MoviesComponent,
                collection_component_1.CollectionComponent,
                reviewed_movies_component_1.ReviewedMoviesComponent,
                profile_component_1.ProfileComponent,
                default_select_component_1.DefaultSelectComponent,
                step1_component_1.Step1Component,
                step2_component_1.Step2Component,
                carousel_component_1.CarouselComponent,
                movie_card_component_1.MovieCardComponent,
                movie_select_component_1.MovieSelectComponent,
                movie_search_component_1.MovieSearchComponent,
                accordion_component_1.AccordionComponent,
                sort_button_component_1.SortButtonComponent,
                default_checkbox_component_1.DefaultCheckboxComponent,
                step3_component_1.Step3Component,
                friends_component_1.FriendsComponent,
                about_us_component_1.AboutUsComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                stepper_1.MatStepperModule,
                progress_bar_1.MatProgressBarModule,
                form_field_1.MatFormFieldModule,
                snack_bar_1.MatSnackBarModule,
                icon_1.MatIconModule,
                store_1.StoreModule.forRoot({ user: user_reducer_1.userReducer }),
                ng_bootstrap_2.NgbAlertModule,
                ng_bootstrap_1.NgbModule,
                ng_bootstrap_2.NgbPaginationModule,
                http_1.HttpClientModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
