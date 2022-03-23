import { Component, Input, OnInit, Output } from '@angular/core';

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

  onBtnClick = () => {
   this.accordionConfig.showContent = !this.accordionConfig.showContent;
  }
  constructor() {

  }
  onInputChange = (res) => {
    this.accordionConfig.searchInput = res;
  }
  onSelectChange = (res) => {
    this.accordionConfig.selectInput = res;
  }

  ngOnInit(): void {
  }

}
