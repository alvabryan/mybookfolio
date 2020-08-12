import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromCadet from '../../store/index';

@Component({
  selector: 'app-custom-cards-view',
  templateUrl: './custom-cards-view.component.html',
  styleUrls: ['./custom-cards-view.component.css']
})
export class CustomCardsViewComponent implements OnInit {

  assignmentId: string;
  currentAssignment: any;

  constructor(private route: ActivatedRoute, private store: Store<fromCadet.State>) { }

  ngOnInit() {
    this.assignmentId = this.route.snapshot.params.id;
    this.store.select('cadet').subscribe((data) => {
      if (data.customCards.assignments) {
        this.currentAssignment = data.customCards.assignments[this.assignmentId];
      }
    });
  }

}
