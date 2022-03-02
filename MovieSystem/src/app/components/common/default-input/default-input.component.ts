import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.scss']
})
export class DefaultInputComponent implements OnInit {
  @Input() inputConfig: {
      placeholder?: string,
      label?: string,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
