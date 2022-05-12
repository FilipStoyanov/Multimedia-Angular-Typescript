import { Component, HostListener, OnInit, OnChanges } from '@angular/core';
import { UserData } from 'src/app/registration/registration.component';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  links = ['home', 'movies', 'collections', 'reviews', 'profile', `/friends`];
  public userData: UserData = {firstname: '', lastname: '', email: '', username: '', password: '', image: '', _id: ''};
  public isShownProfileMenu: boolean;
  user$: Observable<UserData>;
  private unlistener: () => void;
  public imageData?: string | ArrayBuffer;
  constructor(private store: Store<{user: UserData}>,
              private renderer: Renderer2, private router: Router) {
    this.user$ = store.select('user');
    this.user$.subscribe( user => {
      this.userData.username = user.username;
    });
    let parseUser;
    if (JSON.parse(localStorage.getItem('user'))){
      parseUser = JSON.parse(localStorage.getItem('user'));
      this.userData.username = parseUser.username;
    }else{
      this.userData = null;
    }
    if (parseUser && 'image' in parseUser){
      this.imageData = parseUser.image;
    }
    // this.profileImage.getProfileImage(localStorage.getItem('userId')).subscribe(
    //   data => {
    //     this.userData.username = localStorage.getItem('userId');
    //     this.imageData = data.data;
    //   }
    //  );   //NOW WITHOUT MAKING REQUEST
    this.isShownProfileMenu = false;
  }

  ngOnInit(): void {
    console.log('init');
    console.log(this.userData);
    this.unlistener = this.renderer.listen('document', 'click', event => {
      if (event.target.id !== 'profileText' && event.target.id !== 'arrowDown' && event.target.id !== 'arrowUp' &&
          event.target.id !== 'profileImage'){
        this.isShownProfileMenu = false;
      }
    });
  }

  ngOnChanges(): void{
    this.imageData = JSON.parse(localStorage.getItem('user')).image;
  }

  toggleProfileMenu(): void{
      this.isShownProfileMenu = !this.isShownProfileMenu;
  }

  logOut(): void{
    this.router.navigate([`/`]).then(() => window.location.reload());
    localStorage.clear();
  }

  goToFriends(): void {
    this.router.navigate([`/friends`]).then(() => window.location.reload());
  }
}
