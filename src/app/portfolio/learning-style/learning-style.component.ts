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
          if (data.viewData[letLevel]) {
            if (data.viewData[letLevel].content) {
              if (data.viewData[letLevel].content.multipleChoiceData || data.viewData[letLevel].content.fillInSection) {
                const cadetData = data.viewData[letLevel];
                this.setCadetData(cadetData);
              }
            }
          } else {
            this.learningStyle.reset();
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
          enviOne: multipleChoiceData.enviOne.toString(),
          enviTwo: multipleChoiceData.enviTwo.toString(),
          enviThree: multipleChoiceData.enviThree.toString(),
          enviFour: multipleChoiceData.enviFour.toString(),
          enviFive: multipleChoiceData.enviFive.toString(),
          enviSix: multipleChoiceData.enviSix.toString(),
          enviSeven: multipleChoiceData.enviSeven.toString(),
          emoOne: multipleChoiceData.emoOne.toString(),
          emoTwo: multipleChoiceData.emoTwo.toString(),
          emoThree: multipleChoiceData.emoThree.toString(),
          emoFour: multipleChoiceData.emoFour.toString(),
          emoFive: multipleChoiceData.emoFive.toString(),
          emoSix: multipleChoiceData.emoSix.toString(),
          emoSeven: multipleChoiceData.emoSeven.toString(),
          socOne: multipleChoiceData.socOne.toString(),
          socTwo: multipleChoiceData.socTwo.toString(),
          socThree: multipleChoiceData.socThree.toString(),
          socFour: multipleChoiceData.socFour.toString(),
          socFive: multipleChoiceData.socFive.toString(),
          socSix: multipleChoiceData.socSix.toString(),
          socSeven: multipleChoiceData.socSeven.toString(),
          psyOne: multipleChoiceData.psyOne.toString(),
          psyTwo: multipleChoiceData.psyTwo.toString(),
          psyThree: multipleChoiceData.psyThree.toString(),
          psyFour: multipleChoiceData.psyFour.toString(),
          psyFive: multipleChoiceData.psyFive.toString(),
          psySix: multipleChoiceData.psySix.toString(),
          psySeven: multipleChoiceData.psySeven.toString(),
          phyOne: multipleChoiceData.phyOne.toString(),
          phyTwo: multipleChoiceData.phyTwo.toString(),
          phyThree: multipleChoiceData.phyThree.toString(),
          phyFour: multipleChoiceData.phyFour.toString(),
          phyFive: multipleChoiceData.phyFive.toString(),
          phySix: multipleChoiceData.phySix.toString(),
          phySeven: multipleChoiceData.phySeven.toString(),
          phyEight: multipleChoiceData.phyEight.toString(),
          phyNine: multipleChoiceData.phyNine.toString(),
          phyTen: multipleChoiceData.phyTen.toString(),
          phyEleven: multipleChoiceData.phyEleven.toString()
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
