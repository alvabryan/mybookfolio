import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-winning-colors',
  templateUrl: './winning-colors.component.html',
  styleUrls: ['./winning-colors.component.css']
})
export class WinningColorsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  winningColorsForm: FormGroup;

  constructor(private store: Store<fromInstructor.State>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: 'Winning Colors'}));

    this.winningColorsForm = new FormGroup({
      A: new FormGroup({
        A1: new FormControl('0'),
        A2: new FormControl('0'),
        A3: new FormControl('0'),
        A4: new FormControl('0'),
        A5: new FormControl('0')
      }),
      B: new FormGroup({
        B1: new FormControl('0'),
        B2: new FormControl('0'),
        B3: new FormControl('0'),
        B4: new FormControl('0'),
        B5: new FormControl('0')
      }),
      C: new FormGroup({
        C1: new FormControl('0'),
        C2: new FormControl('0'),
        C3: new FormControl('0'),
        C4: new FormControl('0'),
        C5: new FormControl('0')
      }),
      D: new FormGroup({
        D1: new FormControl('0'),
        D2: new FormControl('0'),
        D3: new FormControl('0'),
        D4: new FormControl('0'),
        D5: new FormControl('0')
      })
    });

    this.subscription.add(
      this.store.select('instructor').subscribe(data => {
        if (data.portfolio.viewData) {
          const letLevel = 'let' + data.portfolio.cadetSearchData.letLevel;
          const dataToSearch = data.portfolio.viewData[letLevel].content;
          const cadetData = data.portfolio.viewData[letLevel].content;
          this.setCadetData(cadetData);

        }
      })
    );

  }

  setCadetData(cadetData: any) {
    this.winningColorsForm.setValue({
      A: {
        A1: cadetData.secA.one,
        A2: cadetData.secA.two,
        A3: cadetData.secA.three,
        A4: cadetData.secA.four,
        A5: cadetData.secA.five
      },
      B: {
        B1: cadetData.secB.one,
        B2: cadetData.secB.two,
        B3: cadetData.secB.three,
        B4: cadetData.secB.four,
        B5: cadetData.secB.five
      },
      C: {
        C1: cadetData.secC.one,
        C2: cadetData.secC.two,
        C3: cadetData.secC.three,
        C4: cadetData.secC.four,
        C5: cadetData.secC.five
      },
      D: {
        D1: cadetData.secD.one,
        D2: cadetData.secD.two,
        D3: cadetData.secD.three,
        D4: cadetData.secD.four,
        D5: cadetData.secD.five
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.store.dispatch(PortfolioActions.clearCadetPortfolioViewData());
  }

}
