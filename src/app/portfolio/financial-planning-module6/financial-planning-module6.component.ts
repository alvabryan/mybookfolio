import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-planning-module6',
  templateUrl: './financial-planning-module6.component.html',
  styleUrls: ['./financial-planning-module6.component.css']
})
export class FinancialPlanningModule6Component implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

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

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel]) {
              this.setFinancialPlanningData(data.viewData[letLevel].content);
          } else {
            this.fpModule6Form.reset();
          }
        }
      })
    );
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
      moduleData: this.fpModule6Form.value
    }));
  }

  setFinancialPlanningData(data: any) {
    this.fpModule6Form.setValue({
      riskOne:	data.riskOne,
      riskTwo:	data.riskTwo,
      riskThree:	data.riskThree,
      riskFour:	data.riskFour,
      riskFive:	data.riskFive,
      riskSix:	data.riskSix,
      insuOne:	data.insuOne,
      insuTwo:	data.insuTwo,
      insuThree:	data.insuThree,
      insuFour:	data.insuFour,
      insuFive:	data.insuFive,
      insuSix:	data.insuSix,
      insuSeven:	data.insuSeven,
      insuEight:	data.insuEight,
      insuNine:	data.insuNine,
      insuTen:	data.insuTen,
      insuEleven:	data.insuEleven,
      insuTwelve:	data.insuTwelve,
      insuThirteen:	data.insuThirteen,
      insuFourteen:	data.insuFourteen,
      insuFifteen:	data.insuFifteen,
      insuSixteen:	data.insuSixteen,
      insuSeventeen:	data.insuSeventeen,
      insuEighteen:	data.insuEighteen,
      insuNineteen:	data.insuNineteen,
      insuTwenty:	data.insuTwenty,
      lessonOne:	data.lessonOne,
      lessonTwo:	data.lessonTwo,
      lessonThree:	data.lessonThree,
      lessonFour:	data.lessonFour,
      lessonFive:	data.lessonFive,
      lessonSix:	data.lessonSix,
      lessonSeven:	data.lessonSeven,
      lessonEight:	data.lessonEight,
      monthOne:	data.monthOne
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
