import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

//ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learning-style',
  templateUrl: './learning-style.component.html',
  styleUrls: ['./learning-style.component.css']
})
export class LearningStyleComponent implements OnInit, OnDestroy {

  learningStyle: FormGroup;

  constructor(private store: Store<fromInstructor.State>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Learning Style Inventory'}));
    
    this.learningStyle = new FormGroup({
      environmentalP1: new FormGroup({
        environmentalP1Q1: new FormControl(''),
        environmentalP1Q2: new FormControl(''),
        environmentalP1Q3: new FormControl(''),
        environmentalP1Q4: new FormControl(''),
        environmentalP1Q5: new FormControl(''),
        environmentalP1Q6: new FormControl(''),
        environmentalP1Q7: new FormControl('')
      }),
      emotionalP1: new FormGroup({
        emotionalP1Q1: new FormControl(''),
        emotionalP1Q2: new FormControl(''),
        emotionalP1Q3: new FormControl(''),
        emotionalP1Q4: new FormControl(''),
        emotionalP1Q5: new FormControl(''),
        emotionalP1Q6: new FormControl(''),
        emotionalP1Q7: new FormControl('')
      }),
      sociologicalP1: new FormGroup({
        sociologicalP1Q1: new FormControl(''),
        sociologicalP1Q2: new FormControl(''),
        sociologicalP1Q3: new FormControl(''),
        sociologicalP1Q4: new FormControl(''),
        sociologicalP1Q5: new FormControl(''),
        sociologicalP1Q6: new FormControl(''),
        sociologicalP1Q7: new FormControl('')
      }),
      physicalP1: new FormGroup({
        physicalP1Q1: new FormControl(''),
        physicalP1Q2: new FormControl(''),
        physicalP1Q3: new FormControl(''),
        physicalP1Q4: new FormControl(''),
        physicalP1Q5: new FormControl(''),
        physicalP1Q6: new FormControl(''),
        physicalP1Q7: new FormControl(''),
        physicalP1Q8: new FormControl(''),
        physicalP1Q9: new FormControl(''),
        physicalP1Q10: new FormControl(''),
        physicalP1Q11: new FormControl('')
      }),
      psychologicalP1: new FormGroup({
        psychologicalP1Q1: new FormControl(''),
        psychologicalP1Q2: new FormControl(''),
        psychologicalP1Q3: new FormControl(''),
        psychologicalP1Q4: new FormControl(''),
        psychologicalP1Q5: new FormControl(''),
        psychologicalP1Q6: new FormControl(''),
        psychologicalP1Q7: new FormControl('')
      }),
      environmentalP2: new FormGroup({
        environmentalP2Q1: new FormControl(''),
        environmentalP2Q2: new FormControl(''),
        environmentalP2Q3: new FormControl(''),
        environmentalP2Q4: new FormControl('')
      }),
      emotionalP2: new FormGroup({
        emotionalP2Q1: new FormControl(''),
        emotionalP2Q2: new FormControl(''),
        emotionalP2Q3: new FormControl(''),
        emotionalP2Q4: new FormControl('')
      }),
      sociologicalP2: new FormGroup({
        sociologicalP2Q1: new FormControl(''),
        sociologicalP2Q2: new FormControl(''),
        sociologicalP2Q3: new FormControl(''),
        sociologicalP2Q4: new FormControl(''),
        sociologicalP2Q5: new FormControl(''),
        sociologicalP2Q6: new FormControl(''),
      }),
      physicalP2: new FormGroup({
        physicalP2Q1: new FormControl(''),
        physicalP2Q2: new FormControl(''),
        physicalP2Q3: new FormControl(''),
        physicalP2Q4: new FormControl('')
      })
    });

    this.store.select('instructor').subscribe(data => {
      if(data.portfolio.viewData && data.portfolio.pageName === 'Learning Style Inventory'){
        const letLevel = 'let' + data.portfolio.cadetSearchData.letLevel;
        if(data.portfolio.viewData[letLevel].multipleChoiceData || data.portfolio.viewData[letLevel].fillInSection){
          const cadetData = data.portfolio.viewData[letLevel];
          this.setCadetData(cadetData);
        }
      }
    })
  }


  setCadetData(cadetData: any){
    const multipleChoiceData = cadetData.multipleChoiceSection;
    const fillInData = cadetData.fillInSection;
    this.learningStyle.setValue({
      environmentalP1: {
        environmentalP1Q1: multipleChoiceData.enviOne,
        environmentalP1Q2: multipleChoiceData.enviTwo,
        environmentalP1Q3: multipleChoiceData.enviThree,
        environmentalP1Q4: multipleChoiceData.enviFour,
        environmentalP1Q5: multipleChoiceData.enviFive,
        environmentalP1Q6: multipleChoiceData.enviSix,
        environmentalP1Q7: multipleChoiceData.enviSeven
      },
      emotionalP1: {
        emotionalP1Q1: multipleChoiceData.emoOne,
        emotionalP1Q2: multipleChoiceData.emoTwo,
        emotionalP1Q3: multipleChoiceData.emoThree,
        emotionalP1Q4: multipleChoiceData.emoFour,
        emotionalP1Q5: multipleChoiceData.emoFive,
        emotionalP1Q6: multipleChoiceData.emoSix,
        emotionalP1Q7: multipleChoiceData.emoSeven
      },
      sociologicalP1: {
        sociologicalP1Q1: multipleChoiceData.socOne,
        sociologicalP1Q2: multipleChoiceData.socTwo,
        sociologicalP1Q3: multipleChoiceData.socThree,
        sociologicalP1Q4: multipleChoiceData.socFour,
        sociologicalP1Q5: multipleChoiceData.socFive,
        sociologicalP1Q6: multipleChoiceData.socSix,
        sociologicalP1Q7: multipleChoiceData.socSeven
      },
      physicalP1: {
        physicalP1Q1:  multipleChoiceData.phyOne,
        physicalP1Q2:  multipleChoiceData.phyTwo,
        physicalP1Q3:  multipleChoiceData.phyThree,
        physicalP1Q4:  multipleChoiceData.phyFour,
        physicalP1Q5:  multipleChoiceData.phyFive,
        physicalP1Q6:  multipleChoiceData.phySix,
        physicalP1Q7:  multipleChoiceData.phySeven,
        physicalP1Q8:  multipleChoiceData.phyEight,
        physicalP1Q9:  multipleChoiceData.phyNine,
        physicalP1Q10: multipleChoiceData.phyTen,
        physicalP1Q11: multipleChoiceData.phyEleven
      },
      psychologicalP1: {
        psychologicalP1Q1: multipleChoiceData.psyOne,
        psychologicalP1Q2: multipleChoiceData.psyTwo,
        psychologicalP1Q3: multipleChoiceData.psyThree,
        psychologicalP1Q4: multipleChoiceData.psyFour,
        psychologicalP1Q5: multipleChoiceData.psyFive,
        psychologicalP1Q6: multipleChoiceData.psySix,
        psychologicalP1Q7: multipleChoiceData.psySeven
      },
      environmentalP2: {
        environmentalP2Q1: fillInData.envOne,
        environmentalP2Q2: fillInData.envTwo,
        environmentalP2Q3: fillInData.envThree,
        environmentalP2Q4: fillInData.envFour
      },
      emotionalP2: {
        emotionalP2Q1: fillInData.emoOne,
        emotionalP2Q2: fillInData.emoTwo,
        emotionalP2Q3: fillInData.emoThree,
        emotionalP2Q4: fillInData.emoFour
      },
      sociologicalP2: {
        sociologicalP2Q1: fillInData.socOne,
        sociologicalP2Q2: fillInData.socTwo,
        sociologicalP2Q3: fillInData.socThree,
        sociologicalP2Q4: fillInData.socFour,
        sociologicalP2Q5: fillInData.socFive,
        sociologicalP2Q6: fillInData.socSix
      },
      physicalP2:{
        physicalP2Q1: fillInData.phyOne,
        physicalP2Q2: fillInData.phyTwo,
        physicalP2Q3: fillInData.phyThree,
        physicalP2Q4: fillInData.phyFour
      }
    })
  }

  ngOnDestroy(){
    this.learningStyle.reset();
  }

}
