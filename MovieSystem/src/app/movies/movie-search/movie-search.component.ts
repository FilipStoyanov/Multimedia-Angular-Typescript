import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  @Input() inputValue: string;
  @Output() changeEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor() {  this.inputValue = ''; }

  ngOnInit(): void {
  }
  onKeyUp(event): void {
     this.inputValue = event.target.value;
     this.changeEmitter.emit(this.inputValue);
  }

}
