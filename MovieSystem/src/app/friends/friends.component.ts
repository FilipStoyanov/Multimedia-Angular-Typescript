import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {UserService} from '../services/user.service';
import { UserData } from '../registration/registration.component';
import { Router } from '@angular/router';
import { EventManager } from '@angular/platform-browser';

export interface Friend {
  username: string;
  id: string;
  image: string | ArrayBuffer;
}
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})

export class FriendsComponent implements OnInit, AfterContentInit, OnDestroy {

  users: UserData[];
  userId: string;
  userName: string;
  notFoundUser: boolean;
  notFoundFriend: boolean;
  searchValue: string;
  searchValueFriend: string;
  filteredUser: UserData [];
  friendsUsername: Array<Friend>;
  friends: UserData[];
  filteredFriends: UserData[];
  username: string;
  showAddAlert: boolean;
  showRemoveAlert: boolean;
  navigationUrl: string;
  navUrl: string;
  role: string;
  friendIds: Array<string>;
  friendNames: Array<string>;
  currentUser: UserData;


  @ViewChild('friendInput') friendInput: ElementRef;
  @ViewChild('userInput') userInput: ElementRef;
  constructor(private userService: UserService, private router: Router) {
      this.filteredFriends = [];
      this.friendIds = [];
      this.friendNames = [];
      this.friendsUsername = [];
      this.showAddAlert = false;
      this.showRemoveAlert = false;
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      if (localStorage.getItem('user')){
        const us: UserData = JSON.parse(localStorage.getItem('user'));
        if ('friends' in us){
          this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
        }
        for (const u of this.friendsUsername){
         this.friendIds.push(u.id);
         this.friendNames.push(u.username);
        }
      }

      this.userService.getUsers().subscribe(data => {
        this.users = (data as any).data;
        this.filteredUser = (data as any).data.filter(user => this.friendIds.indexOf(user._id) === -1
        && user.id !== JSON.parse(localStorage.getItem('user'))._id);
        this.friends = (data as any).data;
        // tslint:disable-next-line:max-line-length
        this.filteredFriends = (data as any).data.filter(user => this.friendIds.indexOf(user._id) > -1
        && user.id !== JSON.parse(localStorage.getItem('user'))._id);
      });

      if (JSON.parse(localStorage.getItem('user'))){
        this.username = JSON.parse(localStorage.getItem('user')).username;
        this.role = JSON.parse(localStorage.getItem('user')).role;
      }
      this.searchValue = '';
      this.navUrl = '/user/';
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
    this.filteredFriends = null;
    this.filteredUser = null;
  }

  isFriend(user: Friend): boolean {
    this.currentUser.friends.forEach( u  => {
       if (u.id === user.id){
         return true;
       }
    });
    return false;
  }
  routeToUserProfile(friend: UserData, event: Event): void {
    this.navigationUrl = `/user/${friend._id}`;
    this.userName = friend._id;
    localStorage.setItem('userName', this.userName);
    this.userId = friend._id;
  }
  filterUsers(event): void{
    this.searchValue = event.target.value;
    if (this.searchValue === ''){
      this.filteredUser = this.users.filter(user => this.friendIds.indexOf(user._id) === -1);
    }else{
      this.filteredUser = this.users.filter(user => this.friendIds.indexOf(user._id) === -1
      && user._id !== JSON.parse(localStorage.getItem('user'))._id
      && user.username.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
    }
    this.notFoundUser = (this.filteredUser.length === 0);
  }
  filterFriends(event): void {
    this.searchValueFriend = event.target.value;
    if (this.searchValueFriend === ''){
      this.filteredFriends = [...this.users.filter(user => this.friendIds.indexOf(user._id) > -1
       && user._id !== JSON.parse(localStorage.getItem('user'))._id)];
    }else{
      this.filteredFriends = [...this.users.filter(user => this.friendIds.indexOf(user._id) > -1
      && user._id !== JSON.parse(localStorage.getItem('user'))._id
      && user.username.toLowerCase().indexOf(this.searchValueFriend.toLowerCase()) > -1) ];
    }
    if (this.searchValueFriend.length > 0){
      this.notFoundFriend = (this.filteredFriends.length === 0);
    }else{
      this.notFoundFriend = false;
    }
  }

  removeFriend(friend: UserData, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const fr: Friend = {username: friend.username, id: friend._id, image: friend.image};
    const user: UserData = JSON.parse(localStorage.getItem('user'));
    this.userService.addFriend(user._id, fr).subscribe();
    let indFriends = -1;
    user.friends.forEach( (u, i) => {
      if (u.id === fr.id){
          indFriends = i;
       }
     });
    console.log(indFriends);
    if (indFriends > -1){
      this.filteredFriends.splice(indFriends, 1);
      user.friends.splice(indFriends, 1);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
  addFriend(friend: UserData, event: Event): void {
    event.preventDefault();
    const fr: Friend = {username: friend.username, id:  friend._id, image: ''};
    const user: UserData = JSON.parse(localStorage.getItem('user'));
    this.userService.addFriend(user._id, fr).subscribe(
    );
    const ind = this.friendIds.indexOf(fr.id);
    if (ind === -1){
      user.friends.push(fr);
      this.filteredFriends.push(friend);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.showAddAlert = true;
    setTimeout( () => {
      this.showAddAlert = false;
    }, 3000);
 }
 onTabChanged(event: Event): void {
 }

 removeUser(user: UserData, event: Event): void {
   event.preventDefault();
   const ind = this.filteredUser.indexOf(user);
   if (ind > -1){
      this.filteredUser.splice(ind, 1);
   }
   this.userService.deleteUser(user).subscribe({});
 }

}
