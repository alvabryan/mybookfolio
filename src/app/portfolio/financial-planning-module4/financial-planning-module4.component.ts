import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-financial-planning-module4',
  templateUrl: './financial-planning-module4.component.html',
  styleUrls: ['./financial-planning-module4.component.css']
})
export class FinancialPlanningModule4Component implements OnInit {

  fpModule4Form: FormGroup;

  pageIndex = 1;

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {
    this.fpModule4Form = new FormGroup({
      wealthyOne: new FormControl(''),
      windFallsTwo: new FormControl(''),
      windFallsOne: new FormControl(''),
      windFallsThree: new FormControl(''),
      windFallsFour: new FormControl(''),
      windFallsFive: new FormControl(''),
      windFallsSix: new FormControl(''),
      windFallsSeven: new FormControl(''),
      windFallsEight: new FormControl(''),
      windFallsNine: new FormControl(''),
      moneyOne: new FormControl(''),
      moneyTwo: new FormControl(''),
      differenceOne: new FormControl(''),
      ownOne: new FormControl(''),
      ownTwo: new FormControl(''),
      ownThree: new FormControl(''),
      ownFour: new FormControl(''),
      ownFive: new FormControl(''),
      ownSix: new FormControl(''),
      ownSeven: new FormControl(''),
      ownEight: new FormControl(''),
      ownNine: new FormControl(''),
      ownTen: new FormControl(''),
      ownEleven: new FormControl(''),
      ownTwelve: new FormControl(''),
      watchOne: new FormControl(''),
      watchTwo: new FormControl(''),
      watchThree: new FormControl(''),
      watchFour: new FormControl(''),
      watchFive: new FormControl(''),
      watchSix: new FormControl(''),
      watchSeven: new FormControl(''),
      watchEight: new FormControl(''),
      watchNine: new FormControl(''),
      riskOne: new FormControl(''),
      toolOne: new FormControl(''),
      toolTwo: new FormControl(''),
      toolThree: new FormControl(''),
      toolFour: new FormControl(''),
      toolFive: new FormControl(''),
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
    this.store.dispatch(PortfolioActions.FinancialPlanningModuleThreeUpdate({
      moduleThree: this.fpModule4Form.value
    }));
  }

}
