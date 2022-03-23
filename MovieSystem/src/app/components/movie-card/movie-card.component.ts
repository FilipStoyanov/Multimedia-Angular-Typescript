import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() titleBg: string;
  @Input() titleEn: string;
  @Input() image: string;
  @Input() year: number;
  constructor() {}

  ngOnInit(): void {
  }

}
