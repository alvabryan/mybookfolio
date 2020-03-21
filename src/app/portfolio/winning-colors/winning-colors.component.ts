import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as PortfolioActions from '../store/portfolio.actions';

@Component({
  selector: 'app-winning-colors',
  templateUrl: './winning-colors.component.html',
  styleUrls: ['./winning-colors.component.css']
})
export class WinningColorsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  winningColorsForm: FormGroup;

  constructor(private store: Store<fromPortfolio.State>, private router: Router) { }

  ngOnInit() {

    this.winningColorsForm = new FormGroup({
      secA: new FormGroup({
        one: new FormControl('0'),
        two: new FormControl('0'),
        three: new FormControl('0'),
        four: new FormControl('0'),
        five: new FormControl('0')
      }),
      secB: new FormGroup({
        one: new FormControl('0'),
        two: new FormControl('0'),
        three: new FormControl('0'),
        four: new FormControl('0'),
        five: new FormControl('0')
      }),
      secC: new FormGroup({
        one: new FormControl('0'),
        two: new FormControl('0'),
        three: new FormControl('0'),
        four: new FormControl('0'),
        five: new FormControl('0')
      }),
      secD: new FormGroup({
        one: new FormControl('0'),
        two: new FormControl('0'),
        three: new FormControl('0'),
        four: new FormControl('0'),
        five: new FormControl('0')
      })
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          const cadetData: any = data.viewData[letLevel] ? data.viewData[letLevel].content : null;
          if (cadetData) {
            this.setCadetData(cadetData);
          }
        } else {
          this.winningColorsForm.reset();
        }
      })
    );

  }

  setCadetData(cadetData: any) {
    if (cadetData.secA) {
      this.winningColorsForm.setValue({
        secA: {
          one: cadetData.secA.one,
          two: cadetData.secA.two,
          three: cadetData.secA.three,
          four: cadetData.secA.four,
          five: cadetData.secA.five
        },
        secB: {
          one: cadetData.secB.one,
          two: cadetData.secB.two,
          three: cadetData.secB.three,
          four: cadetData.secB.four,
          five: cadetData.secB.five
        },
        secC: {
          one: cadetData.secC.one,
          two: cadetData.secC.two,
          three: cadetData.secC.three,
          four: cadetData.secC.four,
          five: cadetData.secC.five
        },
        secD: {
          one: cadetData.secD.one,
          two: cadetData.secD.two,
          three: cadetData.secD.three,
          four: cadetData.secD.four,
          five: cadetData.secD.five
        }
      });
    } else {
      this.winningColorsForm.reset();
    }
  }

  onSubmit() {
    const winningData = this.winningColorsForm.value;
    this.store.dispatch(PortfolioActions.winningColorsUpdate({winningColorsData: winningData}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
