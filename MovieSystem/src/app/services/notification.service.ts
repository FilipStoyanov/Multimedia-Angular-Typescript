import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserData } from '../registration/registration.component';
import {Router } from '@angular/router';

export interface Notification{
  senderId: string;
  senderUsername: string;
  receiver: string;
  movieId: string;
  seen?: boolean;
  _id?: string;
  type: string;
}
const baseUrl = 'http://localhost:8080/api/notification';
@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  user: UserData;

  constructor(private http: HttpClient, private router: Router){}
  getAll(): Observable<Notification[]>{
    return this.http.get<Notification[]>(baseUrl);
  }
  getAllNotificationsByUserId(userId: string): Observable<Notification>{
    return this.http.get<Notification>(baseUrl + `/user/${userId}`);
  }
  addNotification(notification: Notification): Observable<Notification> {
    const body = JSON.stringify(notification);
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Notification>(baseUrl, body, {headers});
  }
  readNotification(notification: Notification): Observable<Notification> {
    const body = JSON.stringify(notification);
    const headers = { 'content-type': 'application/json'};
    return this.http.patch<Notification>(baseUrl + `/${notification._id}`, body, {headers});
  }
  removeNotification( notification: Notification): Observable<Notification> {
    return this.http.delete<Notification>(baseUrl + `/${notification._id}`);
  }
}
