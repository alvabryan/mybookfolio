import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-financial-planning-module5',
  templateUrl: './financial-planning-module5.component.html',
  styleUrls: ['./financial-planning-module5.component.css']
})
export class FinancialPlanningModule5Component implements OnInit {

  fpModule5Form: FormGroup;

  pageIndex = 1;

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {
    this.fpModule5Form = new FormGroup({
      proofOne: new FormControl(''),
      proofTwo: new FormControl(''),
      depositOne: new FormControl(''),
      depositTwo: new FormControl(''),
      depositThree: new FormControl(''),
      depositFour: new FormControl(''),
      depositSeven: new FormControl(''),
      depositEight: new FormControl(''),
      depositNine: new FormControl(''),
      depositTen: new FormControl(''),
      depositEleven: new FormControl(''),
      depositTwelve: new FormControl(''),
      depositThirteen: new FormControl(''),
      trackOne: new FormControl(''),
      trackTwo: new FormControl(''),
      trackThree: new FormControl(''),
      trackFour: new FormControl(''),
      trackFive: new FormControl(''),
      trackSix: new FormControl(''),
      trackSeven: new FormControl(''),
      trackEight: new FormControl(''),
      trackNine: new FormControl(''),
      trackTen: new FormControl(''),
      trackEleven: new FormControl(''),
      trackTwelve: new FormControl(''),
      trackThirteen: new FormControl(''),
      trackFourteen: new FormControl(''),
      trackFifteen: new FormControl(''),
      trackSixteen: new FormControl(''),
      trackSeventeen: new FormControl(''),
      trackEighteen: new FormControl(''),
      trackNineteen: new FormControl(''),
      trackTwenty: new FormControl(''),
      trackTwentyOne: new FormControl(''),
      trackTwentyTwo: new FormControl(''),
      trackTwentyThree: new FormControl(''),
      trackTwentyFour: new FormControl(''),
      trackTwentyFive: new FormControl(''),
      trackTwentySix: new FormControl(''),
      trackTwentySeven: new FormControl(''),
      trackTwentyEight: new FormControl(''),
      trackTwentyNine: new FormControl(''),
      trackThirty: new FormControl(''),
      trackThirtyOne: new FormControl(''),
      trackThirtyTwo: new FormControl(''),
      trackThirtyThree: new FormControl(''),
      trackThirtyFour: new FormControl(''),
      trackThirtyFive: new FormControl(''),
      offerOne: new FormControl(''),
      offerTwo: new FormControl(''),
      offerThree: new FormControl('')
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
      moduleThree: this.fpModule5Form.value
    }));
  }

}
