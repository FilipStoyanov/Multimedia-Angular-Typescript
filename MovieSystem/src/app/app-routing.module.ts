import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { MoviesComponent } from './movies/movies.component';
import { CollectionComponent } from './collection/collection.component';
import { ReviewedMoviesComponent } from './reviewed-movies/reviewed-movies.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends/friends.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MovieComponent } from './movie/movie.component';
import {UserComponent} from './user/user.component';

const notRegisteredUser: Routes = [
  { path: '', redirectTo: 'home', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'collections', component: CollectionComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user/:userId', component: UserComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'movie/:movieId', component: MovieComponent},
];

const registeredUser: Routes = [
  { path: '', redirectTo: 'home', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'movies', component: MoviesComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'collections', component: CollectionComponent },
  { path: 'reviews', component: ReviewedMoviesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'user/:userId', component: UserComponent },
  { path: 'movie', component: MovieComponent},
];
enum UserRole {
  admin,
  registeredUser,
  notRegisteredUser,
}
@NgModule({
  imports: [RouterModule.forRoot(localStorage.getItem('userId') ? registeredUser : notRegisteredUser ), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
