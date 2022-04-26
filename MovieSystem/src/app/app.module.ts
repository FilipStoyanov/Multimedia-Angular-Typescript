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
import { ReviewedMoviesComponent } from './reviewed-movies/reviewed-movies.component';
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
// import { LoginReducer } from './store/reducers/login.reducer';

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
    ReviewedMoviesComponent,
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatProgressBarModule,
    MatFormFieldModule,
    // StoreModule.forRoot({user: LoginReducer}),
    NgbModule,
    NgbPaginationModule, NgbAlertModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
