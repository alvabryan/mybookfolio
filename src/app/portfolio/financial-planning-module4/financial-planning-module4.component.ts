import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-planning-module4',
  templateUrl: './financial-planning-module4.component.html',
  styleUrls: ['./financial-planning-module4.component.css']
})
export class FinancialPlanningModule4Component implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

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

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel]) {
              this.setFinancialPlanningData(data.viewData[letLevel].content);
          } else {
            this.fpModule4Form.reset();
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
      moduleData: this.fpModule4Form.value
    }));
  }

  setFinancialPlanningData(data: any) {
    this.fpModule4Form.setValue({
      wealthyOne:	data.wealthyOne,
      windFallsOne:	data.windFallsOne,
      windFallsTwo:	data.windFallsTwo,
      windFallsThree:	data.windFallsThree,
      windFallsFour:	data.windFallsFour,
      windFallsFive:	data.windFallsFive,
      windFallsSix:	data.windFallsSix,
      windFallsSeven:	data.windFallsSeven,
      windFallsEight:	data.windFallsEight,
      windFallsNine:	data.windFallsNine,
      moneyOne:	data.moneyOne,
      moneyTwo:	data.moneyTwo,
      differenceOne:	data.differenceOne,
      ownOne:	data.ownOne,
      ownTwo:	data.ownTwo,
      ownThree:	data.ownThree,
      ownFour:	data.ownFour,
      ownFive:	data.ownFive,
      ownSix:	data.ownSix,
      ownSeven:	data.ownSeven,
      ownEight:	data.ownEight,
      ownNine:	data.ownNine,
      ownTen:	data.ownTen,
      ownEleven:	data.ownEleven,
      ownTwelve:	data.ownTwelve,
      watchOne:	data.watchOne,
      watchTwo:	data.watchTwo,
      watchThree:	data.watchThree,
      watchFour:	data.watchFour,
      watchFive:	data.watchFive,
      watchSix:	data.watchSix,
      watchSeven:	data.watchSeven,
      watchEight:	data.watchEight,
      watchNine:	data.watchNine,
      riskOne:	data.riskOne,
      toolOne:	data.toolOne,
      toolTwo:	data.toolTwo,
      toolThree:	data.toolThree,
      toolFour:	data.toolFour,
      toolFive:	data.toolFive
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
