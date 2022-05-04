import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { UserData } from '../registration.component';
import { UserStep1 } from '../step1/step1.component';
import { UserService } from 'src/app/services/user.service';
import {Store} from '@ngrx/store';
import {addUser} from '../../actions/user.actions';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

export interface UserStep2{
  username: string;
  password: string;
  repeatPassword: string;
}

interface HTMLInputEvent extends Event{
    target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})


export class Step2Component implements OnInit {

  @Input() stepper: MatStepper;
  @Input () userData1: UserStep1;
  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedUserData: EventEmitter<UserStep2> = new EventEmitter<UserStep2>();

  private data: UserStep2 = {username: '', password: '', repeatPassword: ''};
  private user: UserData = {username: '', password: '', repeatPassword: '', firstname: '', lastname: '', email: '', image: '', _id: '',
  birthdate: ''};
  public validation = { username: true, password: true, repeatPassword: true };
  showWarning: boolean;
  public imageUrl: string | ArrayBuffer;
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

  nextBtn = {
    isAnchor: false,
    externalStyles: {
      color: '#ffffff',
      backgroundColor: 'red',
      width: '150px',
      fontSize: '20px',
    },
    text: 'Завърши',
    nextBtn: true,
  };

  backBtn = {
    isAnchor: false,
    externalStyles: {
      color: '#ffffff',
      backgroundColor: 'red',
      width: '150px',
      fontSize: '20px',
    },
    text: 'Назад',
    nextBtn: false,
  };

  favoriteGenres = [];
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
  durationInSeconds = 5;

  updateUsername(newUsername: string): void{
    this.data.username = newUsername;
    this.validation.username  = this.data.username.length > 3 || this.data.username.length === 0;
    this.user.username  = this.data.username;
  }

  updatePassword(newPassword: string): void{
    this.data.password = newPassword;
    this.validation.password = this.data.password.length >= 6 || this.data.password.length === 0;
    if (this.data.repeatPassword === this.data.password){
        this.validation.repeatPassword = true;
    }
    this.user.password = this.data.password;
  }

  updateRepeatPassword(newPassword: string): void{
    this.data.repeatPassword = newPassword;
    this.validation.repeatPassword =  this.data.repeatPassword.length >= 6 || this.data.repeatPassword.length === 0;
    this.validation.repeatPassword = this.validation.repeatPassword  && this.data.repeatPassword === this.data.password;
    this.user.repeatPassword = this.data.repeatPassword;
  }

  readUrl(event: HTMLInputEvent): void{
    if ( event.target.files && event.target.files[0] ){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void{
    document.getElementById('imageUpload').click();
  }

  removeImage(): void{
    this.imageUrl = '';
  }

  onBtnClick(): void{
    if (this.imageUrl === ''){
       this.uploadImage();
     }else {
       this.removeImage();
     }
  }

  isAlreadyAdded(element): boolean{
     for (const curr of this.favoriteGenres){
         if (curr === element){
           return true;
         }
     }
     return false;
  }

  addFavGenre(newGenre): void{
    if (!this.isAlreadyAdded(newGenre)){
      this.favoriteGenres.push(newGenre);
    }else{
     this.alreadyAddedThisGenre();
    }
  }

  alreadyAddedThisGenre(): void{
     this.showWarning = true;
     setTimeout(() => {
       this.showWarning = false;
     }, 4000);
  }

  removeGenre(element): void{
      this.favoriteGenres.forEach((item, index) => {
        if (item === element ){
            this.favoriteGenres.splice(index, 1);
        }
      });
  }

  goForward(stepper: MatStepper): void{
    this.validation.repeatPassword = this.data.repeatPassword.length >= 6 && this.data.repeatPassword === this.data.password;
    this.validation.password = this.data.password.length >= 6;
    this.validation.username  = this.data.username.length > 3;
    this.user.image = this.imageUrl;

    if (this.validation.username && this.validation.password && this.validation.repeatPassword){
      // this.step++;
      // this.changedStep.emit(this.step);
      this.changedUserData.emit(this.data);
      this.userService.addUser(this.user).subscribe(
        data => {this.finishRegistration(stepper); }, //
        error => { if (error.status === 409) { this.openAlert(); }}
      );
      // POST REQUEST TO THE BACKEND HERE
    }else{
      this.validation.username = (this.validation.username === true);
      this.validation.password = (this.validation.password === true);
      this.validation.repeatPassword = (this.validation.repeatPassword === true);
    }
  }

  goBack(stepper: MatStepper): void {
    //  this.step --;
     stepper.previous();
  }

  finishRegistration(stepper: MatStepper): void {
    stepper.next(); this.store.dispatch(addUser({user: this.user}));
    localStorage.setItem('user', JSON.stringify(this.user));
  }


  constructor(private userService: UserService, private store: Store<{user: UserData}>) {
    this.verticalPosition = 'top';
    this.horizontalPosition = 'center';
  }

  openAlert(): void {
    alert('Account with this email already exists!');
  }

  ngOnInit(): void {
    this.user.firstname = this.userData1.firstName;
    this.user.lastname = this.userData1.lastName;
    this.user.email = this.userData1.email;
    this.user.birthdate = this.userData1.birthday;
  }

}
