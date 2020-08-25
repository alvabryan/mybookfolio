import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../../store/index';
import { ActivatedRoute } from '@angular/router';
import * as customCardsActions from '../store/custom-cards.actions';

@Component({
  selector: 'app-custom-cards-view-instructor',
  templateUrl: './custom-cards-view-instructor.component.html',
  styleUrls: ['./custom-cards-view-instructor.component.css']
})
export class CustomCardsViewInstructorComponent implements OnInit {

  editModelData = {
    type: 'edit',
    assignmentId: null,
    assignmentData: null
  };

  assignmentId: string;
  currentAssignment: any;
  cadetSubmissions: any;

  // cadet roster
  cadetRoster: any;
  currentCadet: any;
  currentCadetData: any;

  constructor(private store: Store<fromInstructor.State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.assignmentId = this.route.snapshot.params.id;
    this.editModelData.assignmentId = this.route.snapshot.params.id;

    this.store.dispatch(customCardsActions.getCurrentAssignmentSubmissions({assignmentId: this.route.snapshot.params.id}));

    this.store.select('instructor').subscribe((data) => {
      if (data) {
        if (data.customCards.assignments) {
          this.currentAssignment = data.customCards.assignments[this.route.snapshot.params.id];
          this.editModelData.assignmentData = data.customCards.assignments[this.route.snapshot.params.id];
        }
        if (data.cadetData.cadetProgress) {
          this.cadetRoster = Object.values(data.cadetData.cadetProgress);
        } else {
          this.cadetRoster = null;
        }

        if (data.customCards.cadetSubmissions) {
          this.cadetSubmissions = data.customCards.cadetSubmissions;
        }
      }
    });
  }

  selectCadet(cadetId: any) {
    this.currentCadet = cadetId;
    this.currentCadetData = this.cadetSubmissions[cadetId];
  }

}
