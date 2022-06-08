import { Component, OnInit } from '@angular/core';
import { UserData } from '../registration/registration.component';
import { UserService } from '../services/user.service';
import { Friend } from '../friends/friends.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private userName: string;
  private friends: Friend[];
  public isFriend: boolean;
  public showAlert: boolean;
  private friendIds: string []  = [];
  private us = JSON.parse(localStorage.getItem('user'));
  user: UserData = {username: '', firstname: '', lastname: '', email: '', birthdate: '', password: '', };
  constructor(private userService: UserService, private router: ActivatedRoute) {
    this.userName = localStorage.getItem('userName');
    this.isFriend = false;
    this.showAlert = false;
    this.friends = JSON.parse(localStorage.getItem('user')).friends;
    this.friends.map( u => this.friendIds.push(u.id));
    this.userName = this.router.snapshot.paramMap.get('userId');
    this.userService.getUser(this.userName).subscribe(
      data => {
        if (!data.hasOwnProperty('birthdate')) {
             data.birthdate = '-';
        }
        if (!data.hasOwnProperty('username')) {
          data.username = '';
     }
        this.isFriend = (this.friendIds.indexOf(data._id) > -1);
        this.user = data;
      },
    );
  }

  ngOnInit(): void {
  }


  getEmail(): string{
    let result;
    result += 'mailto:';
    result += this.user.email;
    return result;
  }

  toggleFriend(): void {
    this.isFriend = !this.isFriend;
    this.showAlert = true;
    const friend: Friend = {username: this.user.username, id: this.user._id, image: this.user.image };
    let indFriends = -1;
    this.us.friends.forEach( (u, i) => {
      if (u.id === this.user._id){
          indFriends = i;
      }
    });
    if (indFriends > -1) {
      this.us.friends.splice(indFriends, 1);
    }else{
      this.us.friends.push(friend);
    }
    localStorage.setItem('user', JSON.stringify(this.us));
    console.log(localStorage.getItem('user'));
    this.userService.addFriend(this.us._id, friend).subscribe(
    );
    setTimeout( () => {
      this.showAlert = false;
    }, 3000);
  }
}
