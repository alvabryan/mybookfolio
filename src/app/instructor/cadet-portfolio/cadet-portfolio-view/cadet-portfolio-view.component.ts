import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgressService } from './progress.service';

// ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/index';
import * as PortfolioActions from '../../portfolio/store/portfolio.actions';

@Component({
  selector: 'app-cadet-portfolio-view',
  templateUrl: './cadet-portfolio-view.component.html',
  styleUrls: ['./cadet-portfolio-view.component.css']
})
export class CadetPortfolioViewComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  searchUid: any;
  searchCadet: any;

  filterLetLevel: number;

  queryParams: any;

  progress = {
      yearlyGoals: 0,
      winningColors: 0,
      successProfiler: 0,
      learningStyle: 0,
      personalAd: 0,
      humanGraphActivity: 0,
      resume: 0,
      financialPlanning: 0,
      courseWork: 0,
      essay: 0,
      lessonEvidence: 0,
      writtenSummary: 0,
      achievements: 0,
      cadetChallenge: 0,
      serviceLearning: 0
  };

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private progressService: ProgressService) { }

  ngOnInit() {

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        const progressData = data.cadetData.cadetProgress;
        this.searchCadet = progressData[data.portfolio.cadetSearchData.uid];

        if (this.searchCadet) {
          this.filterLetLevel = data.portfolio.cadetSearchData.letLevel;
          this.getCadetProgress(this.filterLetLevel, this.searchCadet.progress);
        }

      })
    );

  }

  toCadetInformation() {
    this.router.navigate(['/instructor/cadet-portfolio/cadet-information'],
    {queryParams: {uid: this.searchUid, firstName: this.searchCadet.firstName, lastName: this.searchCadet.lastName, letLevel: this.filterLetLevel}});
  }

  getCadetProgress(filterLet, searchCadetProgress) {
    const cadetProgress = this.progressService.getProgress(filterLet, searchCadetProgress);
    this.progress = cadetProgress;
  }

  setLetLevel(letLevel: number) {
    this.store.dispatch(PortfolioActions.updateCadetSearchLetLevel({letLevel}));
    this.filterLetLevel = letLevel;
    this.getCadetProgress(this.filterLetLevel, this.searchCadet.progress);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
