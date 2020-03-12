import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import { Router } from '@angular/router';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-learning-style',
  templateUrl: './learning-style.component.html',
  styleUrls: ['./learning-style.component.css']
})
export class LearningStyleComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  learningStyle: FormGroup;

  constructor(private store: Store<fromPortfolio.State>, private router: Router) { }

  ngOnInit() {

    this.learningStyle = new FormGroup({
      multipleChoiceSection: new FormGroup({
        enviOne: new FormControl(''),
        enviTwo: new FormControl(''),
        enviThree: new FormControl(''),
        enviFour: new FormControl(''),
        enviFive: new FormControl(''),
        enviSix: new FormControl(''),
        enviSeven: new FormControl(''),
        emoOne: new FormControl(''),
        emoTwo: new FormControl(''),
        emoThree: new FormControl(''),
        emoFour: new FormControl(''),
        emoFive: new FormControl(''),
        emoSix: new FormControl(''),
        emoSeven: new FormControl(''),
        socOne: new FormControl(''),
        socTwo: new FormControl(''),
        socThree: new FormControl(''),
        socFour: new FormControl(''),
        socFive: new FormControl(''),
        socSix: new FormControl(''),
        socSeven: new FormControl(''),
        psyOne: new FormControl(''),
        psyTwo: new FormControl(''),
        psyThree: new FormControl(''),
        psyFour: new FormControl(''),
        psyFive: new FormControl(''),
        psySix: new FormControl(''),
        psySeven: new FormControl(''),
        phyOne: new FormControl(''),
        phyTwo: new FormControl(''),
        phyThree: new FormControl(''),
        phyFour: new FormControl(''),
        phyFive: new FormControl(''),
        phySix: new FormControl(''),
        phySeven: new FormControl(''),
        phyEight: new FormControl(''),
        phyNine: new FormControl(''),
        phyTen: new FormControl(''),
        phyEleven: new FormControl('')
      }),
      fillInSection: new FormGroup({
        emoOne: new FormControl(''),
        emoTwo: new FormControl(''),
        emoThree: new FormControl(''),
        emoFour: new FormControl(''),
        envOne: new FormControl(''),
        envTwo: new FormControl(''),
        envThree: new FormControl(''),
        envFour: new FormControl(''),
        socOne: new FormControl(''),
        socTwo: new FormControl(''),
        socThree: new FormControl(''),
        socFour: new FormControl(''),
        socFive: new FormControl(''),
        socSix: new FormControl(''),
        phyOne: new FormControl(''),
        phyTwo: new FormControl(''),
        phyThree: new FormControl(''),
        phyFour: new FormControl('')
      })
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData && data.pageName === 'Learning Style Inventory') {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel].content.multipleChoiceData || data.viewData[letLevel].content.fillInSection) {
            const cadetData = data.viewData[letLevel];
            this.setCadetData(cadetData);
          }
        }
      })
    );
  }


  setCadetData(cadetData: any) {
    const cadetDataCheck = cadetData ? cadetData.content : null;
    const multipleChoiceData = cadetDataCheck ? cadetDataCheck.multipleChoiceSection : null ;
    const fillInData = cadetDataCheck ? cadetDataCheck.fillInSection : null;

    if (cadetDataCheck) {
      this.learningStyle.setValue({
        multipleChoiceSection: {
          enviOne: multipleChoiceData.enviOne,
          enviTwo: multipleChoiceData.enviTwo,
          enviThree: multipleChoiceData.enviThree,
          enviFour: multipleChoiceData.enviFour,
          enviFive: multipleChoiceData.enviFive,
          enviSix: multipleChoiceData.enviSix,
          enviSeven: multipleChoiceData.enviSeven,
          emoOne: multipleChoiceData.emoOne,
          emoTwo: multipleChoiceData.emoTwo,
          emoThree: multipleChoiceData.emoThree,
          emoFour: multipleChoiceData.emoFour,
          emoFive: multipleChoiceData.emoFive,
          emoSix: multipleChoiceData.emoSix,
          emoSeven: multipleChoiceData.emoSeven,
          socOne: multipleChoiceData.socOne,
          socTwo: multipleChoiceData.socTwo,
          socThree: multipleChoiceData.socThree,
          socFour: multipleChoiceData.socFour,
          socFive: multipleChoiceData.socFive,
          socSix: multipleChoiceData.socSix,
          socSeven: multipleChoiceData.socSeven,
          psyOne: multipleChoiceData.psyOne,
          psyTwo: multipleChoiceData.psyTwo,
          psyThree: multipleChoiceData.psyThree,
          psyFour: multipleChoiceData.psyFour,
          psyFive: multipleChoiceData.psyFive,
          psySix: multipleChoiceData.psySix,
          psySeven: multipleChoiceData.psySeven,
          phyOne: multipleChoiceData.phyOne,
          phyTwo: multipleChoiceData.phyTwo,
          phyThree: multipleChoiceData.phyThree,
          phyFour: multipleChoiceData.phyFour,
          phyFive: multipleChoiceData.phyFive,
          phySix: multipleChoiceData.phySix,
          phySeven: multipleChoiceData.phySeven,
          phyEight: multipleChoiceData.phyEight,
          phyNine: multipleChoiceData.phyNine,
          phyTen: multipleChoiceData.phyTen,
          phyEleven: multipleChoiceData.phyEleven
        },
        fillInSection: {
          emoOne: fillInData.emoOne,
          emoTwo: fillInData.emoTwo,
          emoThree: fillInData.emoThree,
          emoFour: fillInData.emoFour,
          envOne: fillInData.envOne,
          envTwo: fillInData.envTwo,
          envThree: fillInData.envThree,
          envFour: fillInData.envFour,
          socOne: fillInData.socOne,
          socTwo: fillInData.socTwo,
          socThree: fillInData.socThree,
          socFour: fillInData.socFour,
          socFive: fillInData.socFive,
          socSix: fillInData.socSix,
          phyOne: fillInData.phyOne,
          phyTwo: fillInData.phyTwo,
          phyThree: fillInData.phyThree,
          phyFour: fillInData.phyFour
        }
      });
    }


  }

  onSubmit() {
    const learningStyleUpdateData = this.learningStyle.value;
    this.store.dispatch(PortfolioActions.learningStyleUpdate({learningStyleData: learningStyleUpdateData}));
  }

  ngOnDestroy() {
    this.learningStyle.reset();
    this.subscription.unsubscribe();
  }

}
