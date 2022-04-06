import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface Accordion {
  showContent: boolean;
  searchInput: string;
  selectInput: string;
}
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})

export class AccordionComponent implements OnInit {

  @Input() accordionConfig: Accordion;
  @Output() changeFilterValues: EventEmitter<Accordion> = new EventEmitter();

  onBtnClick = () => {
   this.accordionConfig.showContent = !this.accordionConfig.showContent;
  }
  constructor() {

  }
  onInputChange = (res) => {
    this.accordionConfig.searchInput = res;
    this.changeFilterValues.emit(this.accordionConfig);
  }
  onSelectChange = (res) => {
    this.accordionConfig.selectInput = res;
    this.changeFilterValues.emit(this.accordionConfig);
  }

  ngOnInit(): void {
  }

}
