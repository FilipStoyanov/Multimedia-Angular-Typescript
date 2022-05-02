import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/login';
export interface Login {
  token?: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }
  addLoggedUser(user: Login): Observable<Login> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(user);
    return this.http.post<Login>(baseUrl, body, {headers});
  }
}
