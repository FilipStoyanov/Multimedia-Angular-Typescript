import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
interface SortBtn {
   isAscending: boolean;
   type: string;
}

@Component({
  selector: 'app-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss']
})
export class SortButtonComponent implements OnInit {

  @Output() btnEmitter: EventEmitter<SortBtn> = new EventEmitter<SortBtn>();
  @Input() btn: SortBtn;

  constructor() {}

  ngOnInit(): void {
  }

  onBtnClick(): void{
    this.btn.isAscending = !this.btn.isAscending;
    this.btnEmitter.emit(this.btn);
  }

}
