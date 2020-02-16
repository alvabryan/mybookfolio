import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-human-graph',
  templateUrl: './human-graph.component.html',
  styleUrls: ['./human-graph.component.css']
})
export class HumanGraphComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  humanGraphForm: FormGroup;

  constructor(private store: Store<fromPortfolio.State>) { }

  ngOnInit() {

    this.humanGraphForm = new FormGroup({
      questionOne: new FormControl(''),
      questionTwo: new FormControl(''),
      questionThree: new FormControl(''),
      questionFour: new FormControl(''),
      questionFive: new FormControl(''),
      questionSix: new FormControl('')
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel].content) {
            this.humanGraphForm.setValue({
              questionOne: data.viewData[letLevel].content.questionOne.toString(),
              questionTwo: data.viewData[letLevel].content.questionTwo.toString(),
              questionThree: data.viewData[letLevel].content.questionThree.toString(),
              questionFour: data.viewData[letLevel].content.questionFour.toString(),
              questionFive: data.viewData[letLevel].content.questionFive.toString(),
              questionSix: data.viewData[letLevel].content.questionSix.toString(),
            });
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
