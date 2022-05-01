import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public closeResult: string;
  public emailInput: string;
  public passwordInput: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  logIn(): void {
     console.log(this.emailInput);
     console.log(this.passwordInput);
  }
  onChangeEmail(event): void {
    this.emailInput = event.target.value;
  }
  onChangePassword(event): void {
    this.passwordInput = event.target.value;
  }
}
