import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-planning-module3',
  templateUrl: './financial-planning-module3.component.html',
  styleUrls: ['./financial-planning-module3.component.css']
})
export class FinancialPlanningModule3Component implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

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

    this.store.select('portfolio').subscribe((data: any) => {
      if (data.viewData) {
        const letLevel = 'let' + data.cadetSearchData.letLevel;
        if (data.viewData[letLevel]) {
            this.setFinancialPlanningData(data.viewData[letLevel].content);
        } else {
          this.fpModule3Form.reset();
        }
      }
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
    this.store.dispatch(PortfolioActions.FinancialPlanningModuleUpdate({
      moduleData: this.fpModule3Form.value
    }));
  }

  setFinancialPlanningData(data: any) {
    this.fpModule3Form.setValue({
      actOne:	data.actOne,
      actTwo:	data.actTwo,
      actThree:	data.actThree,
      intOne:	data.intOne,
      checkOne:	data.checkOne,
      checkTwo:	data.checkTwo,
      myOne:	data.myOne,
      myTwo:	data.myTwo,
      myThree:	data.myThree,
      myFour:	data.myFour,
      myFive:	data.myFive,
      mySix:	data.mySix,
      whatOne:	data.whatOne,
      whatTwo:	data.whatTwo,
      whatThree:	data.whatThree,
      whatFour:	data.whatFour,
      whatFive:	data.whatFive,
      whatSix:	data.whatSix,
      getOne:	data.getOne,
      getTwo:	data.getTwo,
      getThree:	data.getThree,
      getFour:	data.getFour,
      getFive:	data.getFive,
      theOne:	data.theOne,
      theTwo:	data.theTwo,
      theThree:	data.theThree,
      theFour:	data.theFour,
      theFive:	data.theFive,
      theSix:	data.theSix,
      workOne:	data.workOne,
      workTwo:	data.workTwo,
      workThree: data.workThree,
      workFour:	data.workFour,
      workFive:	data.workFive,
      workSix:	data.workSix,
      workSeven:	data.workSeven,
      workEight:	data.workEight,
      adOne:	data.adOne,
      adTwo:	data.adTwo,
      adThree:	data.adThree
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
