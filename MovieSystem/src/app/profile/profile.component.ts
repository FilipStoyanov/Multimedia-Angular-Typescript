import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../registration/registration.component';
import { HTMLInputEvent } from '../registration/step2/step2.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  genres = [
    'Action',
    'Comedy',
    'Animations',
    'Drama',
    'Fantasy',
    'Horror',
    'Science fiction',
    'Western',
  ];

  public user: UserData;
  public editedUser: UserData;
  public changedValue: boolean [];
  public showGenreInput: boolean;
  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.editedUser = JSON.parse(localStorage.getItem('user'));
    this.changedValue = [true, true, true, true, true, true, true, true];
    this.showGenreInput = false;
  }

  ngOnInit(): void {
  }

  uploadImage(): void{
    document.getElementById('imageUpload').click();
  }

  removeImage(): void{
    this.editedUser.image = '';
    this.changedValue[7] = (this.editedUser.image === this.user.image);
  }

  onBtnClick(): void{
    if (this.editedUser.image === ''){
       this.uploadImage();
     }else {
       this.removeImage();
     }
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

  readUrl(event: HTMLInputEvent): void{
    if ( event.target.files && event.target.files[0] ){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editedUser.image = reader.result;
        this.changedValue[7] = (this.editedUser.image === this.user.image);
      };
      reader.readAsDataURL(file);
    }
  }

  removeGenre(genre: string): void {
     const ind = this.editedUser.genres.indexOf(genre);
     if (ind > -1){
       this.editedUser.genres.splice(ind, 1);
       this.changedValue[6] = (this.editedUser.genres.toString() === this.user.genres.toString());
     }
  }
  addGenre(genre): void {
    const ind = this.user.genres.indexOf(genre);
    if (ind === -1) {
      this.editedUser.genres.push(genre);
      this.changedValue[6] = (this.editedUser.genres.toString() === this.user.genres.toString());
    }
  }
  showInput(): void {
     this.showGenreInput = true;
  }
  saveAccount(): void {
    this.userService.editUser(this.user.username, this.editedUser).subscribe();
    localStorage.setItem('user', JSON.stringify(this.editedUser));
    window.location.reload();
  }

}
