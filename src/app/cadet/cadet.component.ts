import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCadet from './store/index';
import * as PortfolioActions from '../portfolio/store/portfolio.actions';

@Component({
  selector: 'app-cadet',
  templateUrl: './cadet.component.html',
  styleUrls: ['./cadet.component.css']
})
export class CadetComponent implements OnInit, OnDestroy  {

  private cadetSubscription: Subscription = new Subscription();

  user: firebase.User;
  userLoaded = false;

  constructor( private db: AngularFirestore, private store: Store<fromCadet.State>) { }

  ngOnInit() {
    this.store.dispatch(PortfolioActions.onReload());
  }

  ngOnDestroy(): void {
    this.cadetSubscription.unsubscribe();
  }


}
