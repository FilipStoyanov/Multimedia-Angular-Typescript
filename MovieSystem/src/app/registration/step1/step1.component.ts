import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { UserData } from '../registration.component';

export interface UserStep1{
  firstName: string;
  lastName: string;
  email: string;
  birthdate?: string;
}

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})

export class Step1Component implements OnInit {

  // @Input() step: number;
  @Input() stepper: MatStepper;
  @Output() changedUserData: EventEmitter<UserStep1> = new EventEmitter<UserStep1>();
  public data: UserStep1 = {firstName: '', lastName: '', email: '', birthdate: ''};

  constructor() {
  }


  public validation =  {firstName: true, lastName: true, email: true};

  countries = [
    'Bulgaria',
    'France',
    'Italy',
    'Germany',
    'Spain',
  ];

  nextBtn = {
    isAnchor: false,
    externalStyles: {
      color: '#ffffff',
      width: '150px',
      fontSize: '20px',
    },
    text: 'Напред',
    nextBtn: true,
  };

  backBtn = {
    isAnchor: false,
    externalStyles: {
      color: '#ffffff',
      width: '150px',
      fontSize: '20px',
    },
    text: 'Назад',
    nextBtn: false,
  };

  nextStepValidation(): Promise<any> {
    return new Promise<any>( () => {
       this.validation.firstName = this.validateName(this.data.firstName);
       this.validation.lastName = this.validateName(this.data.lastName);
       this.validation.email = this.validateEmail(this.data.email);
   });
  }

  private validateName(name: string): boolean{
      if (name.length >= 3 || name.length === 0){
          return !/\d/.test(name);
      }
      return false;
  }
  private validateEmail(email: string): boolean{
    if (email.length >= 3 || email.length === 0){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    return false;
}
  goForward(stepper: MatStepper): void {
       this.validation.firstName = this.data.firstName.length !== 0 ? this.validateName(this.data.firstName) : false ;
       this.validation.lastName = this.data.lastName.length !== 0 ? this.validateName(this.data.lastName) : false;
       this.validation.email = this.data.email.length !== 0 ? this.validateEmail(this.data.email) : false;
       if (this.validation.firstName && this.validation.lastName && this.validation.email){
        stepper.next();
        this.changedUserData.emit(this.data);
       }else{
          this.validation.firstName = (this.validation.firstName === true);
          this.validation.lastName = (this.validation.lastName === true);
          this.validation.email = (this.validation.email === true);
       }
  }

  selectDate(event: any): void{
    this.data.birthdate = event.target.value;
  }

  updateFirstName(newFirstName: string): void{
     this.data.firstName = newFirstName;
     this.validation.firstName = this.validateName(this.data.firstName);
  }

  updateLastName(newLastName: string): void{
     this.data.lastName = newLastName;
     this.validation.lastName = this.validateName(this.data.lastName);
  }
  updateEmail(newEmail: string): void{
     this.data.email = newEmail;
     this.validation.email = this.validateEmail(this.data.email);
  }

  ngOnInit(): void {
  }

  ngOnChange(): void{
  }

}
