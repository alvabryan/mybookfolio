import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, of, EMPTY } from 'rxjs';

// ngrx
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store/index';
import * as InstructorActions from './store/instructor.actions';
import * as BattalionUsersActions from './battalion-users/store/battalion-users.actions';
import * as PortfolioActions from '../portfolio/store/portfolio.actions';
import { take, delay, tap, switchMap, mergeMap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit, OnDestroy {

  private cadetSubscription: Subscription = new Subscription();

  user: any;
  userLoaded = false;

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit() {
    this.cadetSubscription.add(

      this.store.select(fromRoot.authUserSelector).subscribe(data => {
        if (data) {
          this.user = data;
          this.store.dispatch(InstructorActions.getCadetProgress());
          this.store.dispatch(InstructorActions.getCadetDataSheet());
          this.store.dispatch(PortfolioActions.searchCadetLoad());
          this.store.dispatch(PortfolioActions.onReload());
          this.store.dispatch(BattalionUsersActions.getBattalionUsers());
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
