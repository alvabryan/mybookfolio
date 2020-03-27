import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-planning-module4',
  templateUrl: './financial-planning-module4.component.html',
  styleUrls: ['./financial-planning-module4.component.css']
})
export class FinancialPlanningModule4Component implements OnInit {

  pageIndex = 1;

  constructor() { }

  ngOnInit() {
  }


  onClickBack() {
    if (this.pageIndex === 1) {
      return ;
    } else {
      this.pageIndex -= 1;
    }
  }

  onClickNext() {
    if (this.pageIndex === 40) {
      return ;
    } else {
      this.pageIndex += 1;
    }
  }

  onInputChange(event) {
    const value = +event.target.value;
    if (value > 0 && value <= 40) {
      this.pageIndex = value;
    } else {
      this.pageIndex = 1;
    }

  }

}