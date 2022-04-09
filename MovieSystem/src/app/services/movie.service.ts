import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
const baseUrl = 'http://localhost:8080/api/movies';
@Injectable({
  providedIn: 'root',
})

export class MovieService {

  constructor(private http: HttpClient){}
  getAll(): Observable<Movie[]>{
    return this.http.get<Movie[]>(baseUrl);
  }
}
