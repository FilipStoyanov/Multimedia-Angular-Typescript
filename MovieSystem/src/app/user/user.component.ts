import { Component, OnInit } from '@angular/core';
import { UserData } from '../registration/registration.component';
import { UserService } from '../services/user.service';
import { Friend } from '../friends/friends.component';

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
  private friendIds: string [];
  user: UserData = {username: '', firstname: '', lastname: '', email: '', birthdate: '', password: '', };
  constructor(private userService: UserService) {
    this.userName = JSON.parse(localStorage.getItem('userName'));
    this.isFriend = false;
    this.showAlert = false;
    this.friends = JSON.parse(localStorage.getItem('user')).friends;
    this.friends.map( u => this.friendIds.push(u.id));
    this.userService.getUser(this.userName).subscribe(
      data => {
        console.log(data);
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
    this.showAlert = true;
    // this.userService.addFriend(this.user._id, this.userName).subscribe(
    // );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
