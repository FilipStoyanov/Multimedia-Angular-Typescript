import { Component, Input, OnInit,  } from '@angular/core';
import { UserStep2 } from './step2/step2.component';
import { UserStep1 } from './step1/step1.component';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  birthday?: string;
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  constructor() {
    this.currentStep = 1;
  }

  public currentStep: number;
  public date: string;

  private user: UserData = {firstName: '', lastName: '', email: '', username: '', password: '', repeatPassword: '', birthday: ''};

  private updateStepCounter(newStep): void  {
     this.currentStep = newStep;
  }

  private updateUserData1(data: UserStep1): void {
      this.user.firstName = data.firstName;
      this.user.lastName = data.lastName;
      this.user.email = data.email;
      this.user.birthday = data.birthday;
      console.log(this.user);
  }
  private updateUserData2(data: UserStep2): void {
    this.user.username = data.username;
    this.user.password = data.password;
    this.user.repeatPassword = data.repeatPassword;
    console.log(this.user);
  }

  ngOnInit(): void {
  }

  ngOnChange(): void {
  }

}
