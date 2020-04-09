import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-planning-module5',
  templateUrl: './financial-planning-module5.component.html',
  styleUrls: ['./financial-planning-module5.component.css']
})
export class FinancialPlanningModule5Component implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

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
      depositFive: new FormControl(''),
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

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel]) {
              this.setFinancialPlanningData(data.viewData[letLevel].content);
          } else {
            this.fpModule5Form.reset();
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
      moduleData: this.fpModule5Form.value
    }));
  }

  setFinancialPlanningData(data: any) {
    this.fpModule5Form.setValue({
      proofOne:	data.proofOne,
      proofTwo:	data.proofTwo,
      depositOne:	data.depositOne,
      depositTwo:	data.depositTwo,
      depositThree:	data.depositThree,
      depositFour:	data.depositFour,
      depositFive:	data.depositFive,
      depositSeven:	data.depositSeven,
      depositEight:	data.depositEight,
      depositNine:	data.depositNine,
      depositTen:	data.depositTen,
      depositEleven:	data.depositEleven,
      depositTwelve:	data.depositTwelve,
      depositThirteen:	data.depositThirteen,
      trackOne:	data.trackOne,
      trackTwo:	data.trackTwo,
      trackThree:	data.trackThree,
      trackFour:	data.trackFour,
      trackFive:	data.trackFive,
      trackSix:	data.trackSix,
      trackSeven:	data.trackSeven,
      trackEight:	data.trackEight,
      trackNine:	data.trackNine,
      trackTen:	data.trackTen,
      trackEleven:	data.trackEleven,
      trackTwelve:	data.trackTwelve,
      trackThirteen:	data.trackThirteen,
      trackFourteen:	data.trackFourteen,
      trackFifteen:	data.trackFifteen,
      trackSixteen:	data.trackSixteen,
      trackSeventeen:	data.trackSeventeen,
      trackEighteen:	data.trackEighteen,
      trackNineteen:	data.trackNineteen,
      trackTwenty:	data.trackTwenty,
      trackTwentyOne:	data.trackTwentyOne,
      trackTwentyTwo:	data.trackTwentyTwo,
      trackTwentyThree:	data.trackTwentyThree,
      trackTwentyFour:	data.trackTwentyFour,
      trackTwentyFive:	data.trackTwentyFive,
      trackTwentySix:	data.trackTwentySix,
      trackTwentySeven:	data.trackTwentySeven,
      trackTwentyEight:	data.trackTwentyEight,
      trackTwentyNine:	data.trackTwentyNine,
      trackThirty:	data.trackThirty,
      trackThirtyOne:	data.trackThirtyOne,
      trackThirtyTwo:	data.trackThirtyTwo,
      trackThirtyThree:	data.trackThirtyThree,
      trackThirtyFour:	data.trackThirtyFour,
      trackThirtyFive:	data.trackThirtyFive,
      offerOne:	data.offerOne,
      offerTwo:	data.offerTwo,
      offerThree:	data.offerThree
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
