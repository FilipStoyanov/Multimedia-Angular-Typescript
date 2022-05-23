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
var user_reducer_1 = require("./reducers/user.reducer");
var friends_component_1 = require("./friends/friends.component");
var about_us_component_1 = require("./about-us/about-us.component");
var icon_1 = require("@angular/material/icon");
var sign_in_component_1 = require("./components/sign-in/sign-in.component");
var movie_component_1 = require("./movie/movie.component");
var angular_bootstrap_md_1 = require("angular-bootstrap-md");
var youtube_player_1 = require("@angular/youtube-player");
var list_1 = require("@angular/material/list");
var user_component_1 = require("./user/user.component");
var button_1 = require("@angular/material/button");
var button_toggle_1 = require("@angular/material/button-toggle");
var tabs_1 = require("@angular/material/tabs");
var animations_1 = require("@angular/platform-browser/animations");
var expansion_1 = require("@angular/material/expansion");
var card_1 = require("@angular/material/card");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var input_1 = require("@angular/material/input");
var add_collection_component_1 = require("./collection/add-collection/add-collection.component");
var menu_1 = require("@angular/material/menu");
var radio_1 = require("@angular/material/radio");
var store_1 = require("@ngrx/store");
var not_found_component_1 = require("./not-found/not-found.component");
var friend_preferences_component_1 = require("./friend-preferences/friend-preferences.component");
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
                sign_in_component_1.SignInComponent,
                movie_component_1.MovieComponent,
                user_component_1.UserComponent,
                add_collection_component_1.AddCollectionComponent,
                not_found_component_1.NotFoundComponent,
                friend_preferences_component_1.FriendPreferencesComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                radio_1.MatRadioModule,
                app_routing_module_1.AppRoutingModule,
                ng_bootstrap_2.NgbAlertModule,
                angular_bootstrap_md_1.MDBBootstrapModule.forRoot(),
                stepper_1.MatStepperModule,
                progress_bar_1.MatProgressBarModule,
                button_1.MatButtonModule,
                list_1.MatListModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                menu_1.MatMenuModule,
                snack_bar_1.MatSnackBarModule,
                icon_1.MatIconModule,
                dialog_1.MatDialogModule,
                tabs_1.MatTabsModule,
                form_field_1.MatFormFieldModule,
                expansion_1.MatExpansionModule,
                forms_1.FormsModule,
                card_1.MatCardModule,
                button_toggle_1.MatButtonToggleModule,
                animations_1.BrowserAnimationsModule,
                form_field_1.MatFormFieldModule,
                store_1.StoreModule.forRoot({ user: user_reducer_1.userReducer }),
                ng_bootstrap_2.NgbAlertModule,
                ng_bootstrap_1.NgbModule,
                ng_bootstrap_2.NgbPaginationModule,
                http_1.HttpClientModule,
                youtube_player_1.YouTubePlayerModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
