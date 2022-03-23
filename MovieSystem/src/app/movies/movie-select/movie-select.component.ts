import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-select',
  templateUrl: './movie-select.component.html',
  styleUrls: ['./movie-select.component.scss']
})
export class MovieSelectComponent implements OnInit {

  @Input() value: string;
  @Output() selectEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor() { this.value = ''; }
  onChange(event): void{
    this.value = event.target.value;
    this.selectEmitter.emit(this.value);
  }

  ngOnInit(): void {
  }

}
