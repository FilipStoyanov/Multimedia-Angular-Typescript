import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserData } from '../registration/registration.component';


const baseURL = 'http://localhost:8080/api/users';
@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient){}
  addUser(user: UserData): Observable<UserData>{
      const headers = { 'content-type': 'application/json'};
      const body = JSON.stringify(user);
      return this.http.post<UserData>(baseURL, body, {headers});
  }
  getUser(username: string): Observable<UserData>{
    return this.http.get<UserData>(baseURL + `/${username}`);
  }
}
