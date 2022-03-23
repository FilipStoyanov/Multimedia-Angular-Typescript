import { Component, Input, OnInit,  } from '@angular/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  currentStep: number;
  date: string;
  constructor() {
    this.currentStep = 1;
  }

  private updateStepCounter(newStep): void  {
     this.currentStep = newStep;
  }
  private updateDate(date: string): void {
    this.date = date;
  }

  ngOnInit(): void {
  }

  ngOnChange(): void {
  }

}
