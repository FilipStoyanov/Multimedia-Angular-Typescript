"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.HeaderComponent = void 0;

var core_1 = require("@angular/core");

var HeaderComponent =
/** @class */
function () {
  function HeaderComponent(store, renderer, router) {
    var _this = this;

    this.store = store;
    this.renderer = renderer;
    this.router = router;
    this.links = ['', 'movies', 'collections', 'reviews', 'profile'];
    this.userData = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      image: '',
      id: ""
    };
    this.user$ = store.select('user');
    this.user$.subscribe(function (user) {
      _this.userData.username = user.username;
    });
    var parseUser;

    if (JSON.parse(localStorage.getItem('user'))) {
      parseUser = JSON.parse(localStorage.getItem('user'));
      this.userData.username = parseUser.username;
    } else {
      this.userData = null;
    }

    if (parseUser) {
      this.imageData = parseUser.image;
    } // this.profileImage.getProfileImage(localStorage.getItem('userId')).subscribe(
    //   data => {
    //     this.userData.username = localStorage.getItem('userId');
    //     this.imageData = data.data;
    //   }
    //  );   //NOW WITHOUT MAKING REQUEST


    this.isShownProfileMenu = false;
  }

  HeaderComponent.prototype.ngOnInit = function () {
    var _this = this;

    console.log('init');
    console.log(this.userData);
    this.unlistener = this.renderer.listen('document', 'click', function (event) {
      if (event.target.id !== 'profileText' && event.target.id !== 'arrowDown' && event.target.id !== 'arrowUp' && event.target.id !== 'profileImage') {
        _this.isShownProfileMenu = false;
      }
    });
  };

  HeaderComponent.prototype.ngOnChanges = function () {
    this.imageData = JSON.parse(localStorage.getItem('user')).image;
  };

  HeaderComponent.prototype.toggleProfileMenu = function () {
    this.isShownProfileMenu = !this.isShownProfileMenu;
  };

  HeaderComponent.prototype.logOut = function () {
    this.router.navigate(["/"]).then(function () {
      return window.location.reload();
    });
    localStorage.clear();
  };

  HeaderComponent = __decorate([core_1.Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
  })], HeaderComponent);
  return HeaderComponent;
}();

exports.HeaderComponent = HeaderComponent;