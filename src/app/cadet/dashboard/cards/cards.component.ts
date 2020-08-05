import { Component, OnInit, OnDestroy } from '@angular/core';


import { Store } from '@ngrx/store';
import * as fromCadet from '../../store/index';
import { Subscription } from 'rxjs';
import { CardProgressService } from '../card-progress.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  portfolioContet = [
    {
      name: 'Personal Growth', cards:
      [
        // tslint:disable-next-line: max-line-length
        {name: 'Four Year Goals', url: 'four-year-goals', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/goal.png', progress: '0%' },
        // tslint:disable-next-line: max-line-length
        {name: 'Winning Colors', url: 'winning-colors', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/paper.png', progress: '0%' },
        // tslint:disable-next-line: max-line-length
        {name: 'Success Profiler and Personal Growth Plan', url: 'success-profiler', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/successPro.png', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Learning Style Inventory', url: 'learning-style', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/learningStyle.png', progress: '0%'}
      ]
    },
    {
      name: 'Cadet Success', cards:
      [
        {name: 'Personal Ad', url: 'personal-ad', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/pen.png', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Human Graph Activity', url: 'human-graph', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/graphActivity.png', progress: '0%'},
        {name: 'Resume', url: 'resume', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/resume.png', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Achievements', url: 'achievements', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/medal.png', progress: '0%'},
      ]
    },
    {
      name: 'Course Work', cards:
      [
        // tslint:disable-next-line: max-line-length
        {name: 'Course Work', url: 'course-work_courseWork', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/courseWork.png', progress: '0%'},
        {name: 'Essay', url: 'essay', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/essay.png', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Let 1-4 Lesson Evidence', url: 'course-work_lessonEvidence', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/books.png', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Written Summary', url: 'course-work_writtenSummary', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/edit.png', progress: '0%'}
      ]
    },
    {
      name: 'Miscellaneous', cards:
      [
        // tslint:disable-next-line: max-line-length
        {name: 'Cadet Challenge', url: 'portfolio-cadet-challenge', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/running-man.png', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Service Learning', url: 'course-work_serviceLearning', imageUrl: 'https://www.files.mybookfolio.com/imagesCards/serviceLearning.png', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Financial Planning Module 1', url: 'financialPlanningModule1', imageUrl: 'https://image.flaticon.com/icons/svg/2693/2693663.svg', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Financial Planning Module 2', url: 'financialPlanningModule2', imageUrl: 'https://image.flaticon.com/icons/svg/2709/2709722.svg', progress: '0%'},
        // tslint:disable-next-line: max-line-length
      ]
    },
    {
      name: '', cards:
      [
        {name: 'Financial Planning Module 3', url: 'financialPlanningModule3', imageUrl: 'https://image.flaticon.com/icons/svg/2709/2709679.svg', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Financial Planning Module 4', url: 'financialPlanningModule4', imageUrl: 'https://image.flaticon.com/icons/svg/755/755195.svg', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Financial Planning Module 5', url: 'financialPlanningModule5', imageUrl: 'https://image.flaticon.com/icons/svg/639/639365.svg', progress: '0%'},
        // tslint:disable-next-line: max-line-length
        {name: 'Financial Planning Module 6', url: 'financialPlanningModule6', imageUrl: 'https://image.flaticon.com/icons/svg/2145/2145230.svg', progress: '0%'}
      ]
    }
  ];

  constructor(private store: Store<fromCadet.State>, private cardProgress: CardProgressService) { }

  ngOnInit() {
    this.subscription.add(
      this.store.select('cadet').subscribe((data: any) => {
        if (data) {
          if (data.cadetData && data.cadetProgress) {
            const progressFromDb = data.cadetProgress;
            const letLevel = data.cadetData.letLevel;
            const progress: any = this.cardProgress.determineCadetProgress(progressFromDb, letLevel);

            // first four
            this.portfolioContet[0].cards[0].progress = progress.yearlyGoals;
            this.portfolioContet[0].cards[1].progress = progress.winningColors;
            this.portfolioContet[0].cards[2].progress = progress.successProfiler;
            this.portfolioContet[0].cards[3].progress = progress.learningStyle;

            // second four
            this.portfolioContet[1].cards[0].progress = progress.personalAd;
            this.portfolioContet[1].cards[1].progress = progress.humanGraphActivity;
            this.portfolioContet[1].cards[2].progress = progress.resume;
            this.portfolioContet[1].cards[3].progress = progress.achievements;

            // third four
            this.portfolioContet[2].cards[0].progress = progress.courseWork;
            this.portfolioContet[2].cards[1].progress = progress.essay;
            this.portfolioContet[2].cards[2].progress = progress.lessonEvidence;
            this.portfolioContet[2].cards[3].progress = progress.writtenSummary;

            // fourth four
            this.portfolioContet[3].cards[0].progress = progress.cadetChallenge;
            this.portfolioContet[3].cards[1].progress = progress.serviceLearning;
            this.portfolioContet[3].cards[2].progress = progress.financialPlanningModule1;
            this.portfolioContet[3].cards[3].progress = progress.financialPlanningModule2;

            // fourth four
            this.portfolioContet[4].cards[0].progress = progress.financialPlanningModule3;
            this.portfolioContet[4].cards[1].progress = progress.financialPlanningModule4;
            this.portfolioContet[4].cards[2].progress = progress.financialPlanningModule5;
            this.portfolioContet[4].cards[3].progress = progress.financialPlanningModule6;
          }
        }
      })
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
