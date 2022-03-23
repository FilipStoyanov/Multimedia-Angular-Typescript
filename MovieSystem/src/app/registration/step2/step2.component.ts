import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

interface HTMLInputEvent extends Event{
    target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})

export class Step2Component implements OnInit {

  @Input() step: number;
  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();

  showWarning: boolean;
  imageUrl?: string | ArrayBuffer;
  genres = [
    'Action',
    'Comedy',
    'Animations',
    'Drama',
    'Fantasy',
    'Horror',
    'Science fiction',
    'Western',
  ];
  usernameInput = {
    placeholder: 'Username',
    label: 'Username',
  };
  nextBtn = {
    isAnchor: false,
    externalStyles: {
      color: '#ffffff',
      backgroundColor: 'red',
      width: '150px',
      fontSize: '20px',
    },
    text: 'Завърши',
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

  favoriteGenres = [];
  readUrl(event: HTMLInputEvent): void{
    if ( event.target.files && event.target.files[0] ){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void{
    document.getElementById('imageUpload').click();
  }

  removeImage(): void{
    this.imageUrl = '';
  }

  onBtnClick(): void{
    if (this.imageUrl === ''){
       this.uploadImage();
     }else {
       this.removeImage();
     }
  }

  isAlreadyAdded(element): boolean{
     for (const curr of this.favoriteGenres){
         if (curr === element){
           return true;
         }
     }
     return false;
  }

  addFavGenre(newGenre): void{
    if (!this.isAlreadyAdded(newGenre)){
      this.favoriteGenres.push(newGenre);
    }else{
     this.alreadyAddedThisGenre();
    }
  }

  alreadyAddedThisGenre(): void{
     this.showWarning = true;
     setTimeout(() => {
       this.showWarning = false;
     }, 4000);
  }

  requiredField(value): boolean{
      return value !== '';
  }

  removeGenre(element): void{
      this.favoriteGenres.forEach((item, index) => {
        if (item === element ){
            this.favoriteGenres.splice(index, 1);
        }
      });
  }

  updateStep(newStep): void{
    this.step = newStep;
    this.changedStep.emit(this.step);
  }


  constructor() {
  }

  ngOnInit(): void {
  }

}
