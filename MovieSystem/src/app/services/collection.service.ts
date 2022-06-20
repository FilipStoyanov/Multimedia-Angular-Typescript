import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface CollectionMovie {
  titleEn: string;
  titleBg: string;
  year: string;
  image: string;
  _id: string;
}
export interface Collection {
  user: string;
  name: string;
  movies: Array<CollectionMovie>;
  _id: string;
}
const baseURL = 'http://localhost:8080/api/collections';
@Injectable({
  providedIn: 'root',
})

export class CollectionService {
  constructor(private http: HttpClient){}
  collection: Collection;
  getAll(): Observable<Collection[]>{
    return this.http.get<Collection[]>(baseURL);
  }
  getAllForUser(userId: string): Observable<Collection>{
    return this.http.get<Collection>(baseURL + `/${userId}`);
  }
  addCollection(collection: Collection): Observable<Collection>{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(collection);
    return this.http.post<Collection>(baseURL, body, {headers});
  }
  reorderCollection(collection: Collection): Observable<Collection>{
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(collection);
    return this.http.patch<Collection>(baseURL + `/${collection._id}`, body, {headers});
  }
  removeCollection(id: string): Observable<Collection>{
    return this.http.delete<Collection>(baseURL + `/${id}`);
  }
  updateCollection(id: string, titleen: string, titlebg: string, imageMovie: string, yearMovie: string,
                   movieId: string): Observable<Collection>{
    const body = JSON.stringify({
      titleEn: titleen,
      titleBg: titlebg,
      year: yearMovie,
      image: imageMovie,
      id: movieId,
    });
    const headers = { 'content-type': 'application/json'};
    return this.http.put<Collection>(baseURL + `/${id}`, body, {headers});
  }
}
