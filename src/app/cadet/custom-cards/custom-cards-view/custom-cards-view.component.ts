import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromCadet from '../../store/index';
import * as cadetCustomCardActions from '../store/custom-cards.actions';

@Component({
  selector: 'app-custom-cards-view',
  templateUrl: './custom-cards-view.component.html',
  styleUrls: ['./custom-cards-view.component.css']
})
export class CustomCardsViewComponent implements OnInit {

  assignmentId: string;
  currentAssignment: any;
  currentAssignmentSubmission: any;

  constructor(private route: ActivatedRoute, private store: Store<fromCadet.State>) { }

  ngOnInit() {
    this.assignmentId = this.route.snapshot.params.id;
    this.store.select('cadet').subscribe((data) => {
      if (data.customCards.assignments) {
        this.currentAssignment = data.customCards.assignments[this.assignmentId];
      }

      if (data.customCards.currentAssignmentSubmission) {
        this.currentAssignmentSubmission = data.customCards.currentAssignmentSubmission;
      } else {
        this.currentAssignmentSubmission = null;
      }
    });

    this.store.dispatch(cadetCustomCardActions.getCadetSubmission({assignmentId: this.route.snapshot.params.id}));
  }

  deleteSubmission() {
    this.store.dispatch(cadetCustomCardActions.deleteSubmission({currentAssignmentId: this.assignmentId, fileDownloadUrl: this.currentAssignmentSubmission.attachmentUrl}));
  }

}
