import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
    nextBtn?: boolean,
  };
  @Input() stepCounter: number ;

  @Output() changeStep: EventEmitter<number> = new EventEmitter<number>();

  increaseStep(): void {
    this.stepCounter ++;
    this.changeStep.emit(this.stepCounter);
  }
  decreaseStep(): void {
    this.stepCounter > 0 ? this.stepCounter -- : this.stepCounter = 0;
    this.changeStep.emit(this.stepCounter);
  }
  onClickBtn(): void{
    this.buttonConfig.nextBtn  ? this.increaseStep() : this.decreaseStep();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
