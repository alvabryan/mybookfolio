import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-financial-planning-module3',
  templateUrl: './financial-planning-module3.component.html',
  styleUrls: ['./financial-planning-module3.component.css']
})
export class FinancialPlanningModule3Component implements OnInit {

  fpModule3Form: FormGroup;

  pageIndex = 1;

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {
    this.fpModule3Form = new FormGroup({
      actOne: new FormControl(''),
      actTwo: new FormControl(''),
      actThree: new FormControl(''),
      intOne: new FormControl(''),
      checkOne: new FormControl(''),
      checkTwo: new FormControl(''),
      myOne: new FormControl(''),
      myTwo: new FormControl(''),
      myThree: new FormControl(''),
      myFour: new FormControl(''),
      myFive: new FormControl(''),
      mySix: new FormControl(''),
      whatOne: new FormControl(''),
      whatTwo: new FormControl(''),
      whatThree: new FormControl(''),
      whatFour: new FormControl(''),
      whatFive: new FormControl(''),
      whatSix: new FormControl(''),
      getOne: new FormControl(''),
      getTwo: new FormControl(''),
      getThree: new FormControl(''),
      getFour: new FormControl(''),
      getFive: new FormControl(''),
      theOne: new FormControl(''),
      theTwo: new FormControl(''),
      theThree: new FormControl(''),
      theFour: new FormControl(''),
      theFive: new FormControl(''),
      theSix: new FormControl(''),
      workOne: new FormControl(''),
      workTwo: new FormControl(''),
      workThree: new FormControl(''),
      workFour: new FormControl(''),
      workFive: new FormControl(''),
      workSix: new FormControl(''),
      workSeven: new FormControl(''),
      workEight: new FormControl(''),
      adOne: new FormControl(''),
      adTwo: new FormControl(''),
      adThree: new FormControl('')
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
      moduleThree: this.fpModule3Form.value
    }));
  }

}
