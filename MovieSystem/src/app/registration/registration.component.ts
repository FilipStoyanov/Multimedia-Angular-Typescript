import { Component, Input, OnInit,  } from '@angular/core';
import { UserStep2 } from './step2/step2.component';
import { UserStep1 } from './step1/step1.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { select, Store } from '@ngrx/store';
// import { User } from '../store/entity';
import { Observable } from 'rxjs';

export interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role?: string;
  birthdate?: string;
  image?: string | ArrayBuffer;
  repeatPassword?: string;
  _id?: string;
}

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


  constructor() {
  }

  public date: string;

  private user: UserData = {firstname: '', lastname: '', email: '', username: '', password: '', repeatPassword: '', birthdate: '', _id: ''};
  private updateUserData1(data: UserStep1): void {
    this.user.firstname = data.firstName;
    this.user.lastname = data.lastName;
    this.user.email = data.email;
    this.user.birthdate = data.birthday;
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
