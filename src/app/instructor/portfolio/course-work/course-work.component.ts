import { Component, OnInit, OnDestroy } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as PortfolioActions from '../store/portfolio.actions';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-course-work',
  templateUrl: './course-work.component.html',
  styleUrls: ['./course-work.component.css']
})
export class CourseWorkComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromInstructor.State>, private router: Router) { }

  cadetData: Array<any> = [];
  cadetViewData: any;
  pageName: any;

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params.pipe(map(data => {
        switch (data.name) {
          case 'successProfiler':
            return 'Success Profiler';
            break;
          case 'resume':
            return 'Resume';
            break;
          case 'courseWork':
            return 'Course Work';
            break;
          case 'essay':
            return 'Essay';
            break;
          case 'lessonEvidence':
            return 'Lesson Evidence';
            break;
          case 'writtenSummary':
            return 'Written Summary';
            break;
          case 'achievements':
            return 'Achievements';
            break;
          case 'serviceLearning':
            return 'Service Learning';
            break;
          default:
            return 'Course Work 2';
        }
      })).subscribe((data: any) => {
        this.pageName = data;
        this.store.dispatch(PortfolioActions.setPortfolioPageType({pageName: data}));
      })
    );

    this.store.select('instructor').subscribe(data => {
      if (data.portfolio.viewData) {
        const letLevel = 'let' + data.portfolio.cadetSearchData.letLevel;
        if (data.portfolio.viewData[letLevel]) {
          const cadetData = data.portfolio.viewData[letLevel].content;
          this.cadetData = cadetData;
        }
      }
    });
  }

  showModel(fileIndex: number) {
    this.cadetViewData = this.cadetData[fileIndex];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    this.store.dispatch(PortfolioActions.clearCadetPortfolioViewData());
  }

}
