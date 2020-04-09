import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCadet from './store/index';
import * as fromRoot from '../store/index';
import * as PortfolioActions from '../portfolio/store/portfolio.actions';
import * as CadetActions from './store/cadet.actions';

@Component({
  selector: 'app-cadet',
  templateUrl: './cadet.component.html',
  styleUrls: ['./cadet.component.css']
})
export class CadetComponent implements OnInit, OnDestroy  {

  private cadetSubscription: Subscription = new Subscription();

  user: firebase.User;
  userLoaded = false;

  constructor( private db: AngularFirestore, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.onReload());
    this.store.select('auth').subscribe(data => {
      if (data.user) {
        this.store.dispatch(CadetActions.getCadetData());
        this.store.dispatch(CadetActions.getCadetProgress());
        this.store.dispatch(CadetActions.getCadetDataSheet());
      }
    });
  }

  ngOnDestroy(): void {
    this.cadetSubscription.unsubscribe();
  }


}
