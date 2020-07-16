import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from './store/index';
import * as PortfolioActions from './store/portfolio.actions';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
// import { ProgressService } from '../cadet-portfolio/cadet-portfolio-view/progress.service';

import { firestore } from 'firebase/app';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  portfolioViewSelect: FormGroup;

  cadetData: any = {};
  cadetViewData: any = {};
  pageName: any;
  lastUpdated: any;

  cadetProgressData: any = {};

  constructor(
    private store: Store<fromPortfolio.State>,
    private router: Router,
    ) {}

    // private cadetProgressService: ProgressService

  ngOnInit() {

    this.lastUpdated = null;

    this.portfolioViewSelect = new FormGroup({
      pageViewName: new FormControl('')
    });

    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {

          if (data.pageName) {
            const courseWorkTask = [
              'Success Profiler and Personal Growth Plan',
              'Resume',
              'Course Work',
              'Essay',
              'Let 1-4 Lesson Evidence',
              'Written Summary',
              'Achievements',
              'Cadet Challenge',
              'Service Learning'];

            if (courseWorkTask.includes(data.pageName)) {
              this.pageName = {
                pageName: 'Course Work',
                subPage: data.pageName
              };
            } else {
              this.pageName = {
                pageName: data.pageName,
                subPage: data.pageName
              };
            }
            this.setPortfolioViewForm();
          }


          if (data.cadetSearchData) {
            const cadetData = data.cadetSearchData;
            const letLevel = 'let' + cadetData.letLevel;

            this.cadetData = cadetData;

            if (data.viewData) {
              this.cadetViewData = data.viewData;
              if (data.viewData[letLevel]) {
                  if (this.pageName.pageName === 'Course Work') {
                    const dataLength = data.viewData[letLevel].content ? (data.viewData[letLevel].content).length - 1 : 0;
                    if (dataLength) {
                      data.viewData[letLevel].content[dataLength] ? this.lastUpdated = data.viewData[letLevel].content[dataLength].dateSubmitted : this.lastUpdated = null;
                    } else {
                      this.lastUpdated = null;
                    }
                  } else {
                    this.lastUpdated = data.viewData[letLevel].dateSubmitted;
                  }
              } else {
                this.lastUpdated = null;
              }
            } else {
              this.lastUpdated = null;
            }
          }

      })
    );
  }

  setPortfolioViewForm() {
    this.portfolioViewSelect.setValue({
      pageViewName: this.pageName.subPage
    });
  }

  setLetLevel(newLet) {
    this.store.dispatch(PortfolioActions.updateCadetSearchLetLevel({letLevel: newLet}));
  }

  getProgress(filterLet, searchCadetProgress) {
    // const progressReturned = this.cadetProgressService.getProgress(filterLet, searchCadetProgress);
    // return progressReturned;
  }

  changePortfolioView() {
    const pageName = this.portfolioViewSelect.value.pageViewName;
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(PortfolioActions.clearUserPortfolio());
  }

}
