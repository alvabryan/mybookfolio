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
  winningColorsTotal: any;

  constructor(private store: Store<fromPortfolio.State>, private router: Router) { }

  ngOnInit() {

    this.winningColorsForm = new FormGroup({
      secA: new FormGroup({
        one: new FormControl('1'),
        two: new FormControl('1'),
        three: new FormControl('1'),
        four: new FormControl('1'),
        five: new FormControl('1')
      }),
      secB: new FormGroup({
        one: new FormControl('1'),
        two: new FormControl('1'),
        three: new FormControl('1'),
        four: new FormControl('1'),
        five: new FormControl('1')
      }),
      secC: new FormGroup({
        one: new FormControl('1'),
        two: new FormControl('1'),
        three: new FormControl('1'),
        four: new FormControl('1'),
        five: new FormControl('1')
      }),
      secD: new FormGroup({
        one: new FormControl('1'),
        two: new FormControl('1'),
        three: new FormControl('1'),
        four: new FormControl('1'),
        five: new FormControl('1')
      })
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          const cadetData: any = data.viewData[letLevel] ? data.viewData[letLevel].content : null;
          if (cadetData) {
            this.setCadetData(cadetData);
            this.winningColorsTotal = this.calculateTotal(cadetData);
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

  calculateTotal(data: any) {
    let secATotal = 0;
    let secBTotal = 0;
    let secCTotal = 0;
    let secDTotal = 0;

    if (data.secA.one) {
      secATotal = +data.secA.one + +data.secA.two + +data.secA.three + +data.secA.four + +data.secA.five;
    }

    if (data.secB.one) {
      secBTotal = +data.secB.one + +data.secB.two + +data.secB.three + +data.secB.four + +data.secB.five;
    }

    if (data.secC.one) {
      secCTotal = +data.secC.one + +data.secC.two + +data.secC.three + +data.secC.four + +data.secC.five;
    }

    if (data.secD.one) {
      secDTotal = +data.secD.one + +data.secD.two + +data.secD.three + +data.secD.four + +data.secD.five;
    }

    const minSection = Math.min(secATotal, secBTotal, secCTotal, secDTotal);
    const minSectionName = [];
    if (secATotal === minSection) {
      minSectionName.push('secA');
    }

    if (secBTotal === minSection) {
      minSectionName.push('secB');
    }

    if (secCTotal === minSection) {
      minSectionName.push('secC');
    }

    if (secDTotal === minSection) {
      minSectionName.push('secD');
    }

    return {
      secATotal,
      secBTotal,
      secCTotal,
      secDTotal,
      minSectionName
    };
  }

  onSubmit() {
    const winningData = this.winningColorsForm.value;
    this.store.dispatch(PortfolioActions.winningColorsUpdate({winningColorsData: winningData}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
