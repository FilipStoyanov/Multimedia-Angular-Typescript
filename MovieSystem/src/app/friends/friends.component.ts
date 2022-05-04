import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from '../services/user.service';
import { UserData } from '../registration/registration.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, DoCheck {

  users: UserData[];
  userId: string;
  userName: string;
  searchValue: string;
  filteredUser: UserData [];
  constructor(private userService: UserService, private router: Router) {
      this.userService.getUsers().subscribe(data => {
        this.users = (data as any).data;
        this.filteredUser = (data as any).data;
      });
      this.searchValue = '';
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
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
    console.log(this.searchValue);
    if (this.searchValue === ''){
      this.filteredUser = [...this.users as Array<UserData>];
    }else{
      this.filteredUser = this.users.filter(user => user.username.indexOf(this.searchValue) > -1);
    }
  }
  filterFriends(event): void {

  }

}
