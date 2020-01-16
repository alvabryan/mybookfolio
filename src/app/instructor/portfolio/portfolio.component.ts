import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/index';
import * as PortfolioActions from './store/portfolio.actions';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ProgressService } from '../cadet-portfolio/cadet-portfolio-view/progress.service';

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
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private router: Router,
    private cadetProgressService: ProgressService) { }

  ngOnInit() {

    this.lastUpdated = null;

    this.portfolioViewSelect = new FormGroup({
      pageViewName: new FormControl('')
    });

    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {

          this.pageName = data.portfolio.pageName;
          this.setPortfolioViewForm();

          if (data.portfolio.cadetSearchData && data.portfolio.viewData) {
            const cadetData = data.portfolio.cadetSearchData;
            const letLevel = 'let' + cadetData.letLevel;

            this.cadetData = cadetData;

            if (data.cadetData.cadetProgress) {
              const progressData = data.cadetData.cadetProgress;
              const lookUpLetLevel = cadetData.letLevel;
              const cadetProgress: any = progressData[cadetData.uid];
              this.cadetProgressData = this.getProgress(lookUpLetLevel, cadetProgress.progress);
            }

            if (data.portfolio.viewData) {
              this.cadetViewData = data.portfolio.viewData;
              if (data.portfolio.viewData[letLevel].dateSubmitted) {
                  this.lastUpdated = data.portfolio.viewData[letLevel].dateSubmitted;
              } else {
                this.lastUpdated = data.portfolio.viewData[letLevel].content[((data.portfolio.viewData[letLevel].content).length - 1)].dateSubmitted;
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
      pageViewName: this.pageName
    });
  }

  setLetLevel(newLet) {
    this.store.dispatch(PortfolioActions.updateCadetSearchLetLevel({letLevel: newLet}));
  }

  getProgress(filterLet, searchCadetProgress) {
    const progressReturned = this.cadetProgressService.getProgress(filterLet, searchCadetProgress);
    return progressReturned;
  }

  changePortfolioView() {
    const pageName = this.portfolioViewSelect.value.pageViewName;
    switch (pageName) {
      case 'Four Year Goals':
          this.router.navigate(['instructor/portfolio/four-year-goals']);
          break;
      case 'Winning Colors':
          this.router.navigate(['instructor/portfolio/winning-colors']);
          break;
      case 'Success Profiler':
          this.router.navigate(['instructor/portfolio/course-work/successProfiler']);
          break;
      case 'Learning Style Inventory':
          this.router.navigate(['instructor/portfolio/learning-style']);
          break;
      case 'Personal Ad':
          this.router.navigate(['instructor/portfolio/personal-ad']);
          break;
      case 'Human Graph':
          this.router.navigate(['instructor/portfolio/human-graph']);
          break;
      case 'Resume':
          this.router.navigate(['instructor/portfolio/course-work/resume']);
          break;
      case 'Financial Planning':
          this.router.navigate(['instructor/portfolio/financial-planning']);
          break;
      case 'Course Work':
          this.router.navigate(['instructor/portfolio/course-work/courseWork']);
          break;
      case 'Essay':
          this.router.navigate(['instructor/portfolio/course-work/essay']);
          break;
      case 'Lesson Evidence':
          this.router.navigate(['instructor/portfolio/course-work/lessonEvidence']);
          break;
      case 'Written Summary':
          this.router.navigate(['instructor/portfolio/course-work/writtenSummary']);
          break;
      case 'Achievements':
          this.router.navigate(['instructor/portfolio/course-work/achievements']);
          break;
      case 'Cadet Challenge':
          this.router.navigate(['instructor/portfolio/portfolio-cadet-challenge']);
          break;
      case 'Service Learning':
          this.router.navigate(['instructor/portfolio/course-work/serviceLearning']);
          break;
      default:
        console.log('error');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(PortfolioActions.clearUserPortfolio());
  }

}
