import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as PortfolioActions from '../store/portfolio.actions';
import * as fromPortfolio from '../store/index';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-financial-planning-module1',
  templateUrl: './financial-planning-module1.component.html',
  styleUrls: ['./financial-planning-module1.component.css']
})
export class FinancialPlanningModule1Component implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  fpModule1Form: FormGroup;

  pageIndex = 1;

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {
    this.fpModule1Form = new FormGroup({
      habitOne: new FormControl(''),
      habitOneSymbol: new FormControl(''),
      habitOneDesc: new FormControl(''),
      habitTwo: new FormControl(''),
      habitTwoSymbol: new FormControl(''),
      habitTwoDesc: new FormControl(''),
      habitThree: new FormControl(''),
      habitThreeSymbol: new FormControl(''),
      habitThreeDesc: new FormControl(''),
      monthTotal: new FormControl(''),
      yearTotal: new FormControl(''),
      spentOne: new FormControl(''),
      spentTwo: new FormControl(''),
      spentThree: new FormControl(''),
      spentFour: new FormControl(''),
      spentFive: new FormControl(''),
      spentSix: new FormControl(''),
      boughtQuestion: new FormControl(''),
      reasonWaitOne: new FormControl(''),
      reasonWaitTwo: new FormControl(''),
      reasonWaitThree: new FormControl(''),
      needWantOne: new FormControl(''),
      needWantTwo: new FormControl(''),
      itemThree: new FormControl(''),
      needWantThree: new FormControl(''),
      itemFour: new FormControl(''),
      needWantFour: new FormControl(''),
      itemFive: new FormControl(''),
      needWantFive: new FormControl(''),
      itemSix: new FormControl(''),
      needWantSix: new FormControl(''),
      itemSeven: new FormControl(''),
      needWantSeven: new FormControl(''),
      valueOne: new FormControl(''),
      whyOne: new FormControl(''),
      valueTwo: new FormControl(''),
      whyTwo: new FormControl(''),
      valueThree: new FormControl(''),
      whyThree: new FormControl(''),
      valueFour: new FormControl(''),
      whyFour: new FormControl(''),
      smartOne: new FormControl(''),
      smartTwo: new FormControl(''),
      smartThree: new FormControl(''),
      smartFour: new FormControl(''),
      smartFive: new FormControl(''),
      smartSix: new FormControl(''),
      goalOne: new FormControl(''),
      goalTwo: new FormControl(''),
      goalThree: new FormControl(''),
      incomeOne: new FormControl(''),
      incomeTwo: new FormControl(''),
      incomeThree: new FormControl(''),
      incomeFour: new FormControl(''),
      differOne: new FormControl(''),
      differTwo: new FormControl(''),
      myIncome: new FormControl(''),
      questionOne: new FormControl(''),
      questionTwo: new FormControl(''),
      questionThree: new FormControl(''),
      questionFour: new FormControl('')
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel]) {
              this.setFinancialPlanningData(data.viewData[letLevel].content);
          } else {
            this.fpModule1Form.reset();
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
      moduleData: this.fpModule1Form.value
    }));
  }


  setFinancialPlanningData(data: any) {
    this.fpModule1Form.setValue({
      habitOne:	data.habitOne,
      habitOneSymbol:	data.habitOneSymbol,
      habitOneDesc:	data.habitOneDesc,
      habitTwo:	data.habitTwo,
      habitTwoSymbol:	data.habitTwoSymbol,
      habitTwoDesc:	data.habitTwoDesc,
      habitThree:	data.habitThree,
      habitThreeSymbol:	data.habitThreeSymbol,
      habitThreeDesc:	data.habitThreeDesc,
      monthTotal:	data.monthTotal,
      yearTotal:	data.yearTotal,
      spentOne:	data.spentOne,
      spentTwo:	data.spentTwo,
      spentThree:	data.spentThree,
      spentFour:	data.spentFour,
      spentFive:	data.spentFive,
      spentSix:	data.spentSix,
      boughtQuestion:	data.boughtQuestion,
      reasonWaitOne:	data.reasonWaitOne,
      reasonWaitTwo:	data.reasonWaitTwo,
      reasonWaitThree:	data.reasonWaitThree,
      needWantOne:	data.needWantOne,
      needWantTwo:	data.needWantTwo,
      itemThree:	data.itemThree,
      needWantThree:	data.needWantThree,
      itemFour:	data.itemFour,
      needWantFour:	data.needWantFour,
      itemFive:	data.itemFive,
      needWantFive:	data.needWantFive,
      itemSix:	data.itemSix,
      needWantSix:	data.needWantSix,
      itemSeven:	data.itemSeven,
      needWantSeven:	data.needWantSeven,
      valueOne:	data.valueOne,
      whyOne:	data.whyOne,
      valueTwo:	data.valueTwo,
      whyTwo:	data.whyTwo,
      valueThree:	data.valueThree,
      whyThree:	data.whyThree,
      valueFour:	data.valueFour,
      whyFour:	data.whyFour,
      smartOne:	data.smartOne,
      smartTwo:	data.smartTwo,
      smartThree:	data.smartThree,
      smartFour:	data.smartFour,
      smartFive:	data.smartFive,
      smartSix:	data.smartSix,
      goalOne:	data.goalOne,
      goalTwo:	data.goalTwo,
      goalThree:	data.goalThree,
      incomeOne:	data.incomeOne,
      incomeTwo:	data.incomeTwo,
      incomeThree:	data.incomeThree,
      incomeFour:	data.incomeFour,
      differOne:	data.differOne,
      differTwo:	data.differTwo,
      myIncome:	data.myIncome,
      questionOne:	data.questionOne,
      questionTwo:	data.questionTwo,
      questionThree:	data.questionThree,
      questionFour:	data.questionFour
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
