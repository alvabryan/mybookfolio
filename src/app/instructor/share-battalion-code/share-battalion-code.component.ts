import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../store/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-share-battalion-code',
  templateUrl: './share-battalion-code.component.html',
  styleUrls: ['./share-battalion-code.component.css']
})
export class ShareBattalionCodeComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  battalionCode = null;

  constructor(private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.select('auth').subscribe((data: any) => {
      if (data) {
        this.battalionCode = data.user.battalionCode;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
