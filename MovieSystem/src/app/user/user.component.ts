import { Component, OnInit } from '@angular/core';
import { UserData } from '../registration/registration.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private userName: string;
  private friends: string[];
  public isFriend: boolean;
  public showAlert: boolean;
  user: UserData = {username: '', firstname: '', lastname: '', email: '', birthdate: '', password: '', };
  constructor(private userService: UserService) {
    this.userName = localStorage.getItem('userName');
    this.isFriend = false;
    this.showAlert = false;
    this.friends = JSON.parse(localStorage.getItem('user')).friends;
    this.userService.getUser(this.userName).subscribe(
      data => {
        console.log(data);
        if (!data.hasOwnProperty('birthdate')) {
             data.birthdate = '-';
        }
        if (!data.hasOwnProperty('username')) {
          data.username = '';
     }
        this.isFriend = (this.friends.indexOf(data.username) > -1);
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
    this.userService.addFriend(this.user.username, this.userName).subscribe(
    );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
