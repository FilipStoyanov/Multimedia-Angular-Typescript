import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {UserService} from '../services/user.service';
import { UserData } from '../registration/registration.component';
import { Router } from '@angular/router';

export class User implements UserData {
   firstname: string;
   lastname: string;
   email: string;
   username: string;
   password: string;
   role?: string;
   birthdate?: string;
   image?: string | ArrayBuffer;
   repeatPassword?: string;
   id?: string;
   friends?: Array<string>;
   constructor(user: UserData){
     this.firstname = user.firstname;
     this.lastname = user.lastname;
     this.email = user.email;
     this.username = user.username;
     this.password = user.password;
     this.friends = user.friends;
     this.image = user.image;
     this.role = user.role;
     this.birthdate = user.birthdate;
     this.id = user._id;
   }
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
  friendsUsername: Array<string>;
  friends: UserData[];
  filteredFriends: UserData[];
  username: string;
  showAddAlert: boolean;
  showRemoveAlert: boolean;

  @ViewChild('friendInput') friendInput: ElementRef;
  @ViewChild('userInput') userInput: ElementRef;
  constructor(private userService: UserService, private router: Router) {
      this.filteredFriends = [];
      this.showAddAlert = false;
      this.showRemoveAlert = false;
      if (localStorage.getItem('user')){
        this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
      }
      this.userService.getUsers().subscribe(data => {
        this.users = (data as any).data;
        this.filteredUser = (data as any).data.filter(user => this.friendsUsername.indexOf(user.username) === -1);
        this.friends = (data as any).data;
        this.filteredFriends = (data as any).data.filter(user => this.friendsUsername.indexOf(user.username) > -1);
      });
      this.username = JSON.parse(localStorage.getItem('user')).username;
      this.searchValue = '';
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
    this.filteredFriends = [];
    this.filteredUser = [];
  }

  routeToUserProfile(e): void {
    this.userName = e.currentTarget.name;
    localStorage.setItem('userName', this.userName);
    this.userId = e.currentTarget.id;
    this.router.navigate([`/user/${this.userId}`]);
  }
  filterUsers(event): void{
    this.searchValue = event.target.value;
    if (this.searchValue === ''){
      this.filteredUser = this.users.filter(user => this.friendsUsername.indexOf(user.username) === -1);
    }else{
      this.filteredUser = this.filteredUser.filter(user => user.username.indexOf(this.searchValue) > -1);
    }
    this.notFoundUser = (this.filteredUser.length === 0);
  }
  filterFriends(event): void {
    this.searchValueFriend = event.target.value;
    if (this.searchValueFriend === ''){
      this.filteredFriends = [...this.users.filter(user => this.friendsUsername.indexOf(user.username) > -1)];
    }else{
      this.filteredFriends = [...this.users.filter(user => this.friendsUsername.indexOf(user.username) > -1
      && user.username.indexOf(this.searchValueFriend) > -1) ];
    }
    if (this.searchValueFriend.length > 0){
      this.notFoundFriend = (this.filteredFriends.length === 0);
    }else{
      this.notFoundFriend = false;
    }
  }

  removeFriend(friend: UserData, event): void {
     event.stopPropagation();
     const user: UserData = JSON.parse(localStorage.getItem('user'));
     this.userService.addFriend(user.username, friend.username).subscribe();
     const ind = user.friends.indexOf(friend.username);
     if (ind > -1){
         user.friends.splice(ind, 1);
         localStorage.setItem('user', JSON.stringify(user));
         window.location.reload();
     }
  }
  addFriend(friend: UserData, event): void {
    event.stopImmediatePropagation();
    this.filteredFriends = [];
    const user: UserData = JSON.parse(localStorage.getItem('user'));
    this.userService.addFriend(user.username, friend.username).subscribe(
    );
    const ind = user.friends.indexOf(friend.username);
    if (ind === -1){
      user.friends.push(friend.username);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.showAddAlert = true;
    setTimeout( () => {
      this.showAddAlert = false;
    }, 3000);
 }
 onTabChanged(event): void {
  this.friendInput.nativeElement.value = '';
  this.userInput.nativeElement.value = '';
  if (localStorage.getItem('user')){
    this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
  }
  this.userService.getUsers().subscribe(data => {
    this.users = (data as any).data;
    this.filteredUser = (data as any).data.filter(user => this.friendsUsername.indexOf(user.username) === -1);
    this.friends = (data as any).data;
    this.filteredFriends = (data as any).data.filter(user => this.friendsUsername.indexOf(user.username) > -1);
  });
  console.log(this.filteredFriends);
  this.username = JSON.parse(localStorage.getItem('user')).username;
  this.searchValue = '';
 }

}
