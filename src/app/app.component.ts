import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from './store/index';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.refreshWindow());
  }
}
