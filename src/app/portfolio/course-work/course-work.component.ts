import { Component, OnInit, OnDestroy } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import * as fromPortfolio from '../store/index';
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

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromPortfolio.State>, private router: Router) { }

  cadetData: any = [];
  // data for model to display
  cadetViewData: any;
  pageName: any;

  ngOnInit() {
    this.subscription.add(
      this.store.select('portfolio').subscribe((data: any) => {
        this.pageName = data.pageName;

        if (data.viewData) {
          const letLevel = 'let' + data.cadetSearchData.letLevel;
          if (data.viewData[letLevel]) {
              this.cadetData = data.viewData[letLevel].content;
          } else {
            this.cadetData = [];
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
