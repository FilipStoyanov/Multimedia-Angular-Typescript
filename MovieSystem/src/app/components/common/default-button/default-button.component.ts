import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent implements OnInit {

  @Input() buttonConfig: {
    isAnchor?: boolean,
    externalStyles?: any,
    text: string,
    link?: string,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
