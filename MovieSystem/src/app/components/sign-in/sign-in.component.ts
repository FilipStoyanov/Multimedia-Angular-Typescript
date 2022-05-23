import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/registration/registration.component';
import { Store } from '@ngrx/store';
import { addUser } from 'src/app/actions/user.actions';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  public closeResult: string;
  public emailInput: string;
  public passwordInput: string;
  private user: Login = {token: '', email: '', password: ''};
  public invalidCredentials: boolean;
  constructor(private modalService: NgbModal, private userService: LoginService, private userDataService: UserService,
              private router: Router, private store: Store<{user: UserData}>) {
    this.invalidCredentials = false;
   }

  ngOnInit(): void {
  }

  openModal(content): void {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  logIn(): void {
     this.userDataService.getUserByEmail(this.user.email).subscribe(
       res => {
         if (res === null){
            this.invalidCredentials = true;
         }else if ('password' in res && res.password !== this.user.password){
           this.invalidCredentials = true;
         }else if (res && 'password' in res && res.password === this.user.password){
          console.log(res);
          this.invalidCredentials = false;
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate([`/`]).then( () => window.location.reload());
         }
       },
     );
  }

    // this.store.dispatch(addUser({user: data}));
  onChangeEmail(event): void {
    this.emailInput = event.target.value;
    this.user.email = this.emailInput;
  }
  onChangePassword(event): void {
    this.passwordInput = event.target.value;
    this.user.password = this.passwordInput;
  }
}
