import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-planning-module2',
  templateUrl: './financial-planning-module2.component.html',
  styleUrls: ['./financial-planning-module2.component.css']
})
export class FinancialPlanningModule2Component implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

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


    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel]) {
              this.setFinancialPlanningData(data.viewData[letLevel].content);
          } else {
            this.fpModule2Form.reset();
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
      moduleData: this.fpModule2Form.value
    }));
  }

  setFinancialPlanningData(data) {
    this.fpModule2Form.setValue({
      ynOne:	data.ynOne,
      ynTwo:	data.ynTwo,
      ynThree:	data.ynThree,
      ynFour:	data.ynFour,
      ynFive:	data.ynFive,
      ynSix:	data.ynSix,
      ynSeven:	data.ynSeven,
      ynEight:	data.ynEight,
      rOne:	data.rOne,
      rTwo:	data.rTwo,
      rThree:	data.rThree,
      tOne:	data.tOne,
      tTwo:	data.tTwo,
      tThree:	data.tThree,
      tFour:	data.tFour,
      iOne:	data.iOne,
      iTwo:	data.iTwo,
      iThree:	data.iThree,
      tableOneQ:	data.tableOneQ,
      tableTwoQ:	data.tableTwoQ,
      tableThreeQ:	data.tableThreeQ,
      tableFourQ:	data.tableFourQ,
      tableFiveQ:	data.tableFiveQ,
      tableSixQ:	data.tableSixQ,
      tableSevenQ:	data.tableSevenQ,
      twoBone:	data.twoBone,
      twoBtwo:	data.twoBtwo,
      twoBthree:	data.twoBthree,
      twoCone:	data.twoCone,
      twoCtwo:	data.twoCtwo
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
