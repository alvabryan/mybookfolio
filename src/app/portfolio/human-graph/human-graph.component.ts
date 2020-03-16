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
          const humanGraphData = data.viewData[letLevel] ? data.viewData[letLevel].content : null;
          if (humanGraphData) {
            this.humanGraphForm.setValue({
              questionOne: data.viewData[letLevel].content.questionOne ? data.viewData[letLevel].content.questionOne.toString() : null,
              questionTwo: data.viewData[letLevel].content.questionTwo ? data.viewData[letLevel].content.questionTwo.toString() : null,
              questionThree: data.viewData[letLevel].content.questionThree ? data.viewData[letLevel].content.questionThree.toString() : null,
              questionFour: data.viewData[letLevel].content.questionFour ? data.viewData[letLevel].content.questionFour.toString() : null,
              questionFive: data.viewData[letLevel].content.questionFive ? data.viewData[letLevel].content.questionFive.toString() : null,
              questionSix: data.viewData[letLevel].content.questionSix ? data.viewData[letLevel].content.questionSix.toString() : null,
            });
          } else {
            this.humanGraphForm.setValue({
              questionOne: null,
              questionTwo: null,
              questionThree: null,
              questionFour: null,
              questionFive: null,
              questionSix: null,
            });
          }
        }
      })
    );
  }

  onSubmit() {
    const humanGraphUpdateData = this.humanGraphForm.value;
    this.store.dispatch(PortfolioActions.humanGraphUpdate({humanGraphData: humanGraphUpdateData}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
