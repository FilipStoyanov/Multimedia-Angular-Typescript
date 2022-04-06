import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.scss']
})
export class DefaultInputComponent implements OnInit {
  @Input() inputConfig: {
      placeholder?: string,
      label?: string,
      password?: boolean,
  };
  value: string;
  @Output() changedValue: EventEmitter<string> = new EventEmitter<string>();
  @Input() previousValue: string;
  constructor() { }

  handleInput(event: any): void{
    this.value = event.target.value;
    this.changedValue.emit(this.value);
  }

  ngOnInit(): void {
  }

}
