import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { UserData } from '../registration/registration.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, AfterContentInit {

  users: UserData[];
  userId: string;
  userName: string;
  searchValue: string;
  filteredUser: UserData [];
  friendsUsername: Array<string>;
  friends: UserData [];
  filteredFriends: UserData[];
  username: string;
  constructor(private userService: UserService, private router: Router) {
      if (localStorage.getItem('user')){
        this.friendsUsername = JSON.parse(localStorage.getItem('user')).friends;
      }
      for (const friendName of this.friendsUsername) {
        this.userService.getUser(friendName).subscribe(data => {
            this.friends.push(data);
        });
      }
      this.userService.getUsers().subscribe(data => {
        this.users = (data as any).data;
        this.filteredUser = (data as any).data;
      });
      this.username = JSON.parse(localStorage.getItem('user')).username;
      this.searchValue = '';
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  get(): void {
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
      this.filteredUser = [...this.users as Array<UserData>];
    }else{
      this.filteredUser = this.users.filter(user => user.username.indexOf(this.searchValue) > -1);
    }
  }
  filterFriends(event): void {

  }

}
