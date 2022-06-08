import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DefaultButtonComponent } from './components/common/default-button/default-button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { DefaultInputComponent } from './components/common/default-input/default-input.component';
import { MoviesComponent } from './movies/movies.component';
import { CollectionComponent } from './collection/collection.component';
import { ProfileComponent } from './profile/profile.component';
import { DefaultSelectComponent } from './components/common/default-select/default-select.component';
import { Step1Component } from './registration/step1/step1.component';
import { Step2Component } from './registration/step2/step2.component';
import { CarouselComponent } from './components/common/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieSelectComponent } from './movies/movie-select/movie-select.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';
import { AccordionComponent } from './components/common/accordion/accordion.component';
import { SortButtonComponent } from './components/common/sort-button/sort-button.component';
import { DefaultCheckboxComponent } from './components/common/default-checkbox/default-checkbox.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Step3Component } from './registration/step3/step3.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { userReducer } from './reducers/user.reducer';
import { FriendsComponent } from './friends/friends.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {MatIconModule} from '@angular/material/icon';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MovieComponent } from './movie/movie.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {MatListModule} from '@angular/material/list';
import { UserComponent } from './user/user.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AddCollectionComponent } from './collection/add-collection/add-collection.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {MatRadioModule} from '@angular/material/radio';
import {StoreModule} from '@ngrx/store';
import { NotFoundComponent } from './not-found/not-found.component';
import { FriendPreferencesComponent } from './friend-preferences/friend-preferences.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RatingsComponent } from './ratings/ratings.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DefaultButtonComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    DefaultInputComponent,
    MoviesComponent,
    CollectionComponent,
    ProfileComponent,
    DefaultSelectComponent,
    Step1Component,
    Step2Component,
    CarouselComponent,
    MovieCardComponent,
    MovieSelectComponent,
    MovieSearchComponent,
    AccordionComponent,
    SortButtonComponent,
    DefaultCheckboxComponent,
    Step3Component,
    FriendsComponent,
    AboutUsComponent,
    SignInComponent,
    MovieComponent,
    UserComponent,
    AddCollectionComponent,
    NotFoundComponent,
    FriendPreferencesComponent,
    RatingsComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    AppRoutingModule,
    NgbAlertModule,
    MDBBootstrapModule.forRoot(),
    MatStepperModule,
    MatProgressBarModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    DragDropModule,
    MatExpansionModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({user: userReducer}),
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule,
    HttpClientModule,
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
