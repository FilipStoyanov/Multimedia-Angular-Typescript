import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { UserData } from '../registration.component';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  constructor(private router: Router)  {}

  goToHome(): void {
     this.router.navigate([`/`]);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.goToHome();
    }, 4000);
  }



}
