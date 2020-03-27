import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-financial-planning-module2',
  templateUrl: './financial-planning-module2.component.html',
  styleUrls: ['./financial-planning-module2.component.css']
})
export class FinancialPlanningModule2Component implements OnInit {

  fpModule2Form: FormGroup;

  pageIndex = 1;

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
    this.fpModule2Form = new FormGroup({
      ynOne: new FormControl(''),
      ynTwo: new FormControl(''),
      ynThree: new FormControl(''),
      ynFour: new FormControl(''),
      ynFive: new FormControl(''),
      ynSix: new FormControl(''),
      ynSeven: new FormControl(''),
      ynEight: new FormControl(''),
      rOne: new FormControl(''),
      rTwo: new FormControl(''),
      rThree: new FormControl(''),
      tOne: new FormControl(''),
      tTwo: new FormControl(''),
      tThree: new FormControl(''),
      tFour: new FormControl(''),
      iOne: new FormControl(''),
      iTwo: new FormControl(''),
      iThree: new FormControl(''),
      tableOneQ: new FormControl(''),
      tableTwoQ: new FormControl(''),
      tableThreeQ: new FormControl(''),
      tableFourQ: new FormControl(''),
      tableFiveQ: new FormControl(''),
      tableSixQ: new FormControl(''),
      tableSevenQ: new FormControl(''),
      twoBone: new FormControl(''),
      twoBtwo: new FormControl(''),
      twoBthree: new FormControl(''),
      twoCone: new FormControl(''),
      twoCtwo: new FormControl('')
    });
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

  onSubmit() {
    this.store.dispatch(PortfolioActions.FinancialPlanningModuleTwoUpdate({
      moduleTwo: this.fpModule2Form.value
    }));
  }

}
