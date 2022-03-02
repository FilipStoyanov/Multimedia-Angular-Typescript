import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  constructor() { }
  inputConfig = [{
    placeholder: 'First name',
    label: 'First name',
  },
  {
    placeholder: 'Last name',
    label: 'Last name',
  },
  {
    placeholder: 'Username',
    label: 'Username',
  },
  {
    placeholder: 'Email',
    label: 'Email',
  },
  {
    placeholder: 'Age',
    label: 'Age',
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
  };


  ngOnInit(): void {
  }

}
