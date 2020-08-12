import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromCadet from '../store/index';
import * as cadetCustomCardActions from './store/custom-cards.actions';

@Component({
  selector: 'app-custom-cards',
  templateUrl: './custom-cards.component.html',
  styleUrls: ['./custom-cards.component.css']
})
export class CustomCardsComponent implements OnInit {

  assignments: any;

  constructor(private router: Router, private store: Store<fromCadet.State>) { }

  ngOnInit() {
    this.store.dispatch(cadetCustomCardActions.getAssignments());

    this.store.select('cadet').subscribe((data: any) => {
      if (data.customCards.assignments) {
        this.assignments = Object.values(data.customCards.assignments);
      }
    });
  }

  sendToCustomCardView(assignmentId: string) {
    this.router.navigate(['/cadet/assignment-view', assignmentId]);
  }

}
