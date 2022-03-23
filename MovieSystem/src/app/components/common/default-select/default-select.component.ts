import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-select',
  templateUrl: './default-select.component.html',
  styleUrls: ['./default-select.component.scss']
})
export class DefaultSelectComponent implements OnInit {

  constructor() { }
  @Input() options: Array<string>;
  @Input() label: string;
  @Input() defaultValue: string;
  selectedGenre: string;
  @Output() handleSelect: EventEmitter<string> = new EventEmitter<string>();
  changeSelect(event: any): void{
    this.selectedGenre = event.target.value;
    this.handleSelect.emit(this.selectedGenre);
  }
  ngOnInit(): void {
  }

}
