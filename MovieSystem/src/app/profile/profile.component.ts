import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../registration/registration.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: UserData;
  public editedUser: UserData;
  public changedValue: boolean [];
  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.editedUser = JSON.parse(localStorage.getItem('user'));
    this.changedValue = [true, true, true, true, true, true];
  }

  ngOnInit(): void {
  }

  onChangeUsername(event: any): void {
    this.editedUser.username = event.target.value;
    this.changedValue[0] = (this.editedUser.username === this.user.username);
  }
  onChangeFirstname(event: any): void {
    this.editedUser.firstname = event.target.value;
    this.changedValue[1] = (this.editedUser.firstname === this.user.firstname);
  }
  onChangeLastname(event: any): void {
    this.editedUser.lastname = event.target.value;
    this.changedValue[2] = (this.editedUser.lastname === this.user.lastname);
  }
  onChangeEmail(event: any): void {
    this.editedUser.email = event.target.value;
    this.changedValue[3] = (this.editedUser.email === this.user.email);
  }
  onChangeBirthday(event: any): void {
    this.editedUser.birthdate = event.target.value;
    this.changedValue[4] = (this.editedUser.birthdate === this.user.birthdate);
  }
  onChangePassword(event: any): void {
    this.editedUser.password = event.target.value;
    this.changedValue[5] = (this.editedUser.password === this.user.password);
  }
  saveAccount(): void {
    this.userService.editUser(this.user.username, this.editedUser).subscribe();
    localStorage.setItem('user', JSON.stringify(this.editedUser));
    window.location.reload();
  }

}
