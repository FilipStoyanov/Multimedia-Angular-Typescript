import { Component, Input, OnInit,  } from '@angular/core';
import { UserStep2 } from './step2/step2.component';
import { UserStep1 } from './step1/step1.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { select, Store } from '@ngrx/store';
// import { User } from '../store/entity';
import { Observable } from 'rxjs';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  birthday?: string;
}

// const myUser: User = {
//   firstName: 'Filip',
//   lastName: 'Stoyanov',
//   email: 'a@abv.bg',
//   username: 'Filip',
//   password: 'Stoyanov',
//   image: 'image',
//   age: '22',
// };

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class RegistrationComponent implements OnInit {

  // public currentStep: number;

  constructor() {
    // this.currentStep = 1;
  }
  // userData: Observable<User>;
  // constructor(private store: Store<{user: User}>) {
  //   this.currentStep = 1;
  //   this.userData = store.pipe(select('user'));
  // }


  public date: string;

  private user: UserData = {firstName: '', lastName: '', email: '', username: '', password: '', repeatPassword: '', birthday: ''};

  // private updateStepCounter(newStep): void  {
  //   this.currentStep = newStep;
  // }

  private updateUserData1(data: UserStep1): void {
    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.email = data.email;
    this.user.birthday = data.birthday;
  }
  private updateUserData2(data: UserStep2): void {
    this.user.username = data.username;
    this.user.password = data.password;
    this.user.repeatPassword = data.repeatPassword;
  }

  ngOnInit(): void {
  }


  ngOnChange(): void {
  }

}
