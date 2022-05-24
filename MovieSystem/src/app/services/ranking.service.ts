import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserData } from '../registration/registration.component';
import { Movie } from './movie.service';
import {Router } from '@angular/router';
import { coerceStringArray } from '@angular/cdk/coercion';

export interface Ranking{
  senderId: Array<string>;
  senderUsername: Array<string>;
  movies: Array<Array<Movie>>;
  receiver: string;
  collectionId: string;
  collectionName: string;
  seen?: boolean;
  _id?: string;
}
const baseUrl = 'http://localhost:8080/api/ranking';
@Injectable({
  providedIn: 'root',
})

export class RankingService {
  user: UserData;

  constructor(private http: HttpClient, private router: Router){}
  getAll(): Observable<Ranking[]>{
    return this.http.get<Ranking[]>(baseUrl);
  }
  getAllRankingsByUserId(userId: string): Observable<Ranking[]>{
    return this.http.get<Ranking[]>(baseUrl + `/user/${userId}`);
  }
  updateRanking(ranking: Ranking): Observable<Ranking> {
    const body = JSON.stringify(ranking);
    const headers = { 'content-type': 'application/json'};
    return this.http.put<Ranking>(baseUrl, body, {headers});
  }
  deleteRanking(ranking: Ranking): Observable<Ranking>{
    return this.http.delete<Ranking>(baseUrl + `/${ranking._id}`);
  }
}
