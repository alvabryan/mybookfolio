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

  cadetData: any = [];
  cadetViewData: any;
  pageName: any;

  ngOnInit() {
    this.subscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        this.pageName = data.portfolio.pageName;
      })
    );
    this.subscription.add(
      this.store.select('instructor').subscribe(data => {
        if (data.portfolio.viewData) {
          const letLevel = 'let' + data.portfolio.cadetSearchData.letLevel;
          if (data.portfolio.viewData[letLevel]) {
            const cadetData = data.portfolio.viewData[letLevel].content;
            this.cadetData = cadetData;
          }
        }
      })
    );
  }

  showModel(fileIndex: number) {
    this.cadetViewData = this.cadetData[fileIndex];
  }

  deleteFile(deleteFileIndex) {
    const cadetFileData = this.cadetData.slice();
    this.store.dispatch(PortfolioActions.deleteFile({filesData: cadetFileData, fileIndex: deleteFileIndex, pageName: this.pageName}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
