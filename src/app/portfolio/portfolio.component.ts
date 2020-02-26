import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from './store/index';
import * as PortfolioActions from './store/portfolio.actions';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
// import { ProgressService } from '../cadet-portfolio/cadet-portfolio-view/progress.service';

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
    ) { }

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
              'Learning Style Inventory',
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

            // if (data.cadetData.cadetProgress) {
            //   const progressData = data.cadetData.cadetProgress;
            //   const lookUpLetLevel = cadetData.letLevel;
            //   const cadetProgress: any = progressData[cadetData.uid];
            //   this.cadetProgressData = this.getProgress(lookUpLetLevel, cadetProgress.progress);
            // }

            if (data.viewData) {
              this.cadetViewData = data.viewData;
              if (data.viewData[letLevel]) {
                  this.lastUpdated = data.viewData[letLevel].dateSubmitted;
              } else {
                // this.lastUpdated = data.portfolio.viewData[letLevel].content[((data.portfolio.viewData[letLevel].content).length - 1)].dateSubmitted;
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
    let newTaskPath = [];
    switch (pageName) {
      case 'Four Year Goals':
          newTaskPath = ['instructor/portfolio/four-year-goals'];
          break;
      case 'Winning Colors':
          newTaskPath = ['instructor/portfolio/winning-colors'];
          break;
      case 'Success Profiler and Personal Growth Plan':
          newTaskPath = ['instructor/portfolio/course-work/successProfiler'];
          break;
      case 'Learning Style Inventory':
          newTaskPath = ['instructor/portfolio/learning-style'];
          break;
      case 'Personal Ad':
          newTaskPath = ['instructor/portfolio/personal-ad'];
          break;
      case 'Human Graph Activity':
          newTaskPath = ['instructor/portfolio/human-graph'];
          break;
      case 'Resume':
          newTaskPath = ['instructor/portfolio/course-work/resume'];
          break;
      case 'Financial Planning':
          newTaskPath = ['instructor/portfolio/financial-planning'];
          break;
      case 'Course Work':
          newTaskPath = ['instructor/portfolio/course-work/courseWork'];
          break;
      case 'Essay':
          newTaskPath = ['instructor/portfolio/course-work/essay'];
          break;
      case 'Lesson Evidence':
          newTaskPath = ['instructor/portfolio/course-work/lessonEvidence'];
          break;
      case 'Written Summary':
          newTaskPath = ['instructor/portfolio/course-work/writtenSummary'];
          break;
      case 'Achievements':
          newTaskPath = ['instructor/portfolio/course-work/achievements'];
          break;
      case 'Cadet Challenge':
          newTaskPath = ['instructor/portfolio/portfolio-cadet-challenge'];
          break;
      case 'Service Learning':
          newTaskPath = ['instructor/portfolio/course-work/serviceLearning'];
          break;
      default:
        console.log('error');
    }
    this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName}));
    this.router.navigate(newTaskPath);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(PortfolioActions.clearUserPortfolio());
  }

}
