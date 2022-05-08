import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Comment {
  username: string;
  image?: string;
  id: string;
  _id: string;
  description: string;
  date: string;
}
const baseURL = 'http://localhost:8080/api/comments';
@Injectable({
  providedIn: 'root',
})

export class CommentService {
  constructor(private http: HttpClient){}
  comment: Comment;
  getAll(): Observable<Comment[]>{
    return this.http.get<Comment[]>(baseURL);
  }
  getCommentById(id): Observable<Comment>{
    return this.http.get<Comment>(baseURL + `/${id}`);
  }
  addComment(comment: Comment): Observable<Comment>{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(comment);
    return this.http.post<Comment>(baseURL, body, {headers});
  }
  removeComment(id: string): Observable<Comment>{
    return this.http.delete<Comment>(baseURL + `/${id}`);
  }
}
