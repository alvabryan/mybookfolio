import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-financial-planning-module6',
  templateUrl: './financial-planning-module6.component.html',
  styleUrls: ['./financial-planning-module6.component.css']
})
export class FinancialPlanningModule6Component implements OnInit {

  fpModule6Form: FormGroup;

  pageIndex = 1;

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {
    this.fpModule6Form = new FormGroup({
      riskOne: new FormControl(''),
      riskTwo: new FormControl(''),
      riskThree: new FormControl(''),
      riskFour: new FormControl(''),
      riskFive: new FormControl(''),
      riskSix: new FormControl(''),
      insuOne: new FormControl(''),
      insuTwo: new FormControl(''),
      insuThree: new FormControl(''),
      insuFour: new FormControl(''),
      insuFive: new FormControl(''),
      insuSix: new FormControl(''),
      insuSeven: new FormControl(''),
      insuEight: new FormControl(''),
      insuNine: new FormControl(''),
      insuTen: new FormControl(''),
      insuEleven: new FormControl(''),
      insuTwelve: new FormControl(''),
      insuThirteen: new FormControl(''),
      insuFourteen: new FormControl(''),
      insuFifteen: new FormControl(''),
      insuSixteen: new FormControl(''),
      insuSeventeen: new FormControl(''),
      insuEighteen: new FormControl(''),
      insuNineteen: new FormControl(''),
      insuTwenty: new FormControl(''),
      lessonOne: new FormControl(''),
      lessonTwo: new FormControl(''),
      lessonThree: new FormControl(''),
      lessonFour: new FormControl(''),
      lessonFive: new FormControl(''),
      lessonSix: new FormControl(''),
      lessonSeven: new FormControl(''),
      lessonEight: new FormControl(''),
      monthOne: new FormControl('')
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
      moduleThree: this.fpModule6Form.value
    }));
  }

}
