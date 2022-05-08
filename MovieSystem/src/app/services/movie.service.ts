import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../registration/registration.component';

export interface Movie{
  titleEn: string;
  titleBg: string;
  image: string;
  year: string;
  genre: string;
  producer: string;
  rating: number;
  watches: number;
  country: string;
  _id: string;
  description: string;
  id?: string;
  trailer: string;
  averageRating?: string;
}
const baseUrl = 'http://localhost:8080/api/movies';
@Injectable({
  providedIn: 'root',
})

export class MovieService {
  user: UserData;

  constructor(private http: HttpClient){}
  getAll(): Observable<Movie[]>{
    return this.http.get<Movie[]>(baseUrl);
  }
  getMovieById(id): Observable<Movie>{
    return this.http.get<Movie>(baseUrl + `/${id}`);
  }
  rateMovie(movieId: string, userRating: string, user: string): Observable<Movie>{
    const body = JSON.stringify({
      userId: user,
      rating: userRating,
    });
    const headers = { 'content-type': 'application/json'};
    return this.http.put<Movie>(baseUrl + `/${movieId}`, body, {headers});
  }
}
