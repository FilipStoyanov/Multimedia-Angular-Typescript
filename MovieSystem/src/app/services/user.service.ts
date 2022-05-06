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
  user: UserData;
  addUser(user: UserData): Observable<UserData>{
      const headers = { 'content-type': 'application/json'};
      const body = JSON.stringify(user);
      return this.http.post<UserData>(baseURL, body, {headers});
  }
  getUsers(): Observable<UserData[]>{
    return this.http.get<UserData[]>(baseURL);
  }
  getUser(username: string): Observable<UserData>{
    return this.http.get<UserData>(baseURL + `/${username}`);
  }
  getUserByEmail(email: string): Observable<UserData>{
    return this.http.get<UserData>(baseURL + `/${email}`);
  }
  addFriend(username: string, friendName: string): Observable<UserData>{
    this.user = JSON.parse(localStorage.getItem('user'));
    const findIndex = this.user.friends.indexOf(friendName);
    if (findIndex === -1){
      this.user.friends.push(friendName);
    }else{
      this.user.friends.splice(findIndex, 1);
    }
    localStorage.setItem('user', JSON.stringify(this.user));
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify({friend: friendName});

    return this.http.put<UserData>(baseURL + `/${username}`, body, {headers});
  }
}
