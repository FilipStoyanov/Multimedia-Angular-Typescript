import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  @Input() step: number;
  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedDate: EventEmitter<string> = new EventEmitter<string>();

  countries = [
    'Bulgaria',
    'France',
    'Italy',
    'Germany',
    'Spain',
  ];
  inputConfig = [{
    placeholder: 'First name',
    label: 'First name',
  },
  {
    placeholder: 'Last name',
    label: 'Last name',
  },
  {
    placeholder: 'Email',
    label: 'Email',
  }];

  nextBtn = {
    isAnchor: false,
    externalStyles: {
      color: '#ffffff',
      backgroundColor: 'red',
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
      backgroundColor: 'red',
      width: '150px',
      fontSize: '20px',
    },
    text: 'Назад',
    nextBtn: false,
  };
  date: string;

  updateStep(newStep): void{
    this.step = newStep;
    this.changedStep.emit(this.step);
  }

  selectDate(event: any): void{
    this.date = event.target.value;
    this.changedDate.emit(this.date);
  }

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChange(): void{
  }

}
