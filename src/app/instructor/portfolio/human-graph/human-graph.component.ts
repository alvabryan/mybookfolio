import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-human-graph',
  templateUrl: './human-graph.component.html',
  styleUrls: ['./human-graph.component.css']
})
export class HumanGraphComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  humanGraphForm: FormGroup;

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({ pageName: 'Human Graph' }));

    this.humanGraphForm = new FormGroup({
      questionOne: new FormControl(''),
      questionTwo: new FormControl(''),
      questionThree: new FormControl(''),
      questionFour: new FormControl(''),
      questionFive: new FormControl(''),
      questionSix: new FormControl('')
    });

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if (data.portfolio.viewData) {
          const letLevel = 'let' + data.portfolio.cadetSearchData.letLevel;
          if (data.portfolio.viewData[letLevel].content) {
            this.humanGraphForm.setValue({
              questionOne: data.portfolio.viewData[letLevel].content.questionOne.toString(),
              questionTwo: data.portfolio.viewData[letLevel].content.questionTwo.toString(),
              questionThree: data.portfolio.viewData[letLevel].content.questionThree.toString(),
              questionFour: data.portfolio.viewData[letLevel].content.questionFour.toString(),
              questionFive: data.portfolio.viewData[letLevel].content.questionFive.toString(),
              questionSix: data.portfolio.viewData[letLevel].content.questionSix.toString(),
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
