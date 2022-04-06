import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { UserData } from '../registration.component';

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

  @Input() step: number;
  @Input() previousUserData: UserData;
  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedUserData: EventEmitter<UserStep2> = new EventEmitter<UserStep2>();

  private data: UserStep2 = {username: '', password: '', repeatPassword: ''};
  public validation = { username: true, password: true, repeatPassword: true };

  showWarning: boolean;
  imageUrl?: string | ArrayBuffer;
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

  updateUsername(newUsername: string): void{
    this.data.username = newUsername;
    this.validation.username  = this.data.username.length > 3 || this.data.username.length === 0;
  }

  updatePassword(newPassword: string): void{
    this.data.password = newPassword;
    this.validation.password = this.data.password.length >= 6 || this.data.password.length === 0;
    if (this.data.repeatPassword === this.data.password){
        this.validation.repeatPassword = true;
    }
  }

  updateRepeatPassword(newPassword: string): void{
    this.data.repeatPassword = newPassword;
    this.validation.repeatPassword =  this.data.repeatPassword.length >= 6 || this.data.repeatPassword.length === 0;
    this.validation.repeatPassword = this.validation.repeatPassword  && this.data.repeatPassword === this.data.password;
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

  updateStep(newStep): void{
    this.validation.repeatPassword = this.data.repeatPassword.length >= 6 && this.data.repeatPassword === this.data.password;
    this.validation.password = this.data.password.length >= 6;
    this.validation.username  = this.data.username.length > 3;
    if (this.validation.username && this.validation.password && this.validation.repeatPassword){
      this.step = newStep;
      this.changedStep.emit(this.step);
      this.changedUserData.emit(this.data);
      // POST REQUEST TO THE BACKEND HERE
    }else{
      this.validation.username = (this.validation.username === true);
      this.validation.password = (this.validation.password === true);
      this.validation.repeatPassword = (this.validation.repeatPassword === true);
    }
  }


  constructor() {
  }

  ngOnInit(): void {
    this.data.username = this.previousUserData.username;
    this.data.password = this.previousUserData.password;
    this.data.repeatPassword = this.previousUserData.repeatPassword;
  }

}
