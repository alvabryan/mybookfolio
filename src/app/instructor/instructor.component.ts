import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, of, EMPTY } from 'rxjs';

// ngrx
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store/index';
import * as InstructorActions from './store/instructor.actions';
import * as PortfolioActions from '../portfolio/store/portfolio.actions';
import { take, delay, tap, switchMap, mergeMap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit, OnDestroy {

  private cadetSubscription: Subscription = new Subscription();

  user: any;
  userLoaded = false;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.cadetSubscription.add(

      this.store.select(fromRoot.authUserSelector).subscribe(data => {
        if (data) {
          this.user = data;
          this.store.dispatch(InstructorActions.getCadetProgress());
          this.store.dispatch(InstructorActions.getCadetDataSheet());
          this.store.dispatch(PortfolioActions.searchCadetLoad());
          this.store.dispatch(PortfolioActions.onReload());
        }
      })
    );

    this.cadetSubscription.add(
      this.store.select(fromRoot.instructorSelector).subscribe((data: any) => {
        if (data.cadetData.cadetProgress) {
          this.userLoaded = true;
        }
      })
    );

    this.store.dispatch(InstructorActions.onReload());

  }

  ngOnDestroy() {
    this.cadetSubscription.unsubscribe();
  }


}
