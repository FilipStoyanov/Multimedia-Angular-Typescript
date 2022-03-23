import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-checkbox',
  templateUrl: './default-checkbox.component.html',
  styleUrls: ['./default-checkbox.component.scss']
})
export class DefaultCheckboxComponent implements OnInit {

  @Input() label: string;
  constructor() { }

  ngOnInit(): void {
  }

}
