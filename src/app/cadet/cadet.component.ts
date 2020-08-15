import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCadet from './store/index';
import * as fromRoot from '../store/index';
import * as PortfolioActions from '../portfolio/store/portfolio.actions';
import * as CadetActions from './store/cadet.actions';
import * as cadetCustomCardActions from './custom-cards/store/custom-cards.actions';

@Component({
  selector: 'app-cadet',
  templateUrl: './cadet.component.html',
  styleUrls: ['./cadet.component.css']
})
export class CadetComponent implements OnInit, OnDestroy  {

  private cadetSubscription: Subscription = new Subscription();

  user: any;
  userLoaded = false;

  constructor( private db: AngularFirestore, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.cadetSubscription.add(
      this.store.select(fromCadet.authUserSelector).subscribe(data => {
        if (data) {
          if (data.battalionCode) {
            this.user = data;
            this.store.dispatch(CadetActions.getCadetData());
            this.store.dispatch(CadetActions.getCadetProgress());
            this.store.dispatch(CadetActions.getCadetDataSheet());
            this.store.dispatch(cadetCustomCardActions.getAssignments());
            this.store.dispatch(PortfolioActions.onReload());
          }
        }
      })
    );

    this.cadetSubscription.add(
      this.store.select(fromCadet.cadetSelector).subscribe((data: any) => {
        if (data) {
          if (data.cadet.cadetData) {
            this.userLoaded = true;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.cadetSubscription.unsubscribe();
  }


}
