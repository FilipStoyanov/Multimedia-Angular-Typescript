import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { MoviesComponent } from './movies/movies.component';
import { CollectionComponent } from './collection/collection.component';
import { ReviewedMoviesComponent } from './reviewed-movies/reviewed-movies.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'collections', component: CollectionComponent },
  { path: 'reviews', component: ReviewedMoviesComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
