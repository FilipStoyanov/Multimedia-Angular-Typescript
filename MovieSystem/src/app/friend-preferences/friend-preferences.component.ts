import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Movie } from '../services/movie.service';
import { Preference, PreferenceService } from '../services/preference.service';
import { UserData } from '../registration/registration.component';
import { RankingService } from '../services/ranking.service';
import { Ranking } from '../services/ranking.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../services/notification.service';

@Component({
  selector: 'app-friend-preferences',
  templateUrl: './friend-preferences.component.html',
  styleUrls: ['./friend-preferences.component.scss']
})
export class FriendPreferencesComponent implements OnInit {

  prefData: Preference[];
  user: UserData;
  showSendAlert: boolean;
  // movies: Array<Movie[]>;
  constructor(private preferenceService: PreferenceService, private rankingService: RankingService,
              private notificationService: NotificationService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.prefData = [];
    this.showSendAlert = false;
    // this.movies = [];
    this.preferenceService.getAllPreferencesByUserId(this.user._id).subscribe(
      data => {
       this.prefData = (data as any).data;
      //  console.log(this.prefData);
      //  for (const item of this.prefData){
      //    this.movies.push(item.movies);
      //  }
      //  console.log(this.movies);
      },
      //
    );

  }
  drop( movieList, event: CdkDragDrop<string[]>): void {
    moveItemInArray(movieList, event.previousIndex, event.currentIndex);
  }
  sendPreference(preference: Preference, e: Event): void {
    this.showSendAlert = true;
    const films: Movie[][] = [];
    films.push(preference.movies);
    const arrIds = [this.user._id];
    const arrUsernames = [this.user.username];
    const ranking: Ranking = {senderId: arrIds, senderUsername: arrUsernames, movies: films,
    collectionId: preference.collectionId, collectionName: preference.collectionName, receiver: preference.senderId, seen: false};
    this.rankingService.updateRanking(ranking).subscribe({});

    const notification: Notification = { senderId: this.user._id, senderUsername: this.user.username,
    receiver: preference.senderId, movieId: 'none', type: 'ranking'};
    this.notificationService.addNotification(notification).subscribe({});

    this.deletePreference(preference, e);
    setTimeout(() => {
    this.showSendAlert = false;
    }, 4000);
  }
  deletePreference(pref: Preference, e: Event): void {
       const reqObject = {senderId: pref.senderId, senderUsername: pref.senderUsername, movies: pref.movies,
       _id: pref._id,
       receivers: pref.receivers, collectionId: pref.collectionId, collectionName: pref.collectionName, userId: this.user._id};
       this.preferenceService.deletePreference(reqObject).subscribe({});
       const ind = this.prefData.indexOf(pref);
       this.prefData.splice(ind, 1);
  }
  ngOnInit(): void {
  }

}
