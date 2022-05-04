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
  user: UserData = {username: '', firstname: '', lastname: '', email: '', birthdate: '', password: '', };
  constructor(private userService: UserService) {
    this.userName = localStorage.getItem('userName');
    this.userService.getUser(this.userName).subscribe(
      data => {
        if (!data.hasOwnProperty('birthdate')) {
             data.birthdate = '-';
        }
        if (!data.hasOwnProperty('username')) {
          data.username = '';
     }
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
}
