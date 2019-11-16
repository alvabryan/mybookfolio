import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, of, EMPTY } from 'rxjs';

//ngrx
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store/index';
import * as InstructorActions from './store/instructor.actions';
import * as PortfolioActions from './portfolio/store/portfolio.actions';
import { take, delay, tap, switchMap, mergeMap } from 'rxjs/operators';

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


      this.store.select('auth').subscribe(userData => {
        if(userData.user){
          this.user = userData.user;
          this.store.dispatch(InstructorActions.getCadetData());
          this.store.dispatch(InstructorActions.getCadetProgress());
          this.store.dispatch(PortfolioActions.searchCadetLoad());
        }
      })
    )

    this.cadetSubscription.add(
      this.store.select('instructor').subscribe((data: any) => {
        if(data.cadetData.cadetRoster && data.cadetData.cadetProgress){
          this.userLoaded = true;
        }
      })
    )

  }

  ngOnDestroy() {
    this.cadetSubscription.unsubscribe();
  }


}
