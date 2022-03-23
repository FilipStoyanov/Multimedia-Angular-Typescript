import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {


  @Input() images = [];
  constructor() { }

  openMovieLink(url): void{
   window.open(url, '_blank');
  }
  ngOnInit(): void {
  }

}
