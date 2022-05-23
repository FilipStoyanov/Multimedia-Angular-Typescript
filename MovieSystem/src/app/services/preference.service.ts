import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserData } from '../registration/registration.component';
import { Movie } from './movie.service';
import {Router } from '@angular/router';

export interface Preference{
  senderId: string;
  senderUsername: string;
  movies: Array<Movie>;
  receivers: Array<string>;
  seen?: boolean;
  _id?: string;
}
const baseUrl = 'http://localhost:8080/api/preferences';
@Injectable({
  providedIn: 'root',
})

export class PreferenceService {
  user: UserData;

  constructor(private http: HttpClient, private router: Router){}
  getAll(): Observable<Preference[]>{
    return this.http.get<Preference[]>(baseUrl);
  }
  getAllPreferencesByUserId(userId: string): Observable<Preference[]>{
    return this.http.get<Preference[]>(baseUrl + `/user/${userId}`);
  }
  addPreference(preference: Preference): Observable<Preference> {
    const body = JSON.stringify(preference);
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Preference>(baseUrl, body, {headers});
  }
}
