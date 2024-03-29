import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromInstructor from '../store/index';
import * as customCardActions from './store/custom-cards.actions';

@Component({
  selector: 'app-custom-cards-instructor',
  templateUrl: './custom-cards-instructor.component.html',
  styleUrls: ['./custom-cards-instructor.component.css']
})
export class CustomCardsInstructorComponent implements OnInit {

  editModelData = {
    type: 'new',
    assignmentId: null,
    assignmentData: null
  };

  assignments: any;

  constructor(private router: Router, private store: Store<fromInstructor.State>) { }

  ngOnInit() {
    this.store.dispatch(customCardActions.getAssignments());

    this.store.select('instructor').subscribe((data) => {
      if (data.customCards) {
        if (data.customCards.assignments) {
          this.assignments = Object.values(data.customCards.assignments);
        }
      }
    });
  }

  sendToInstructorCustomCardView(assignmentId: string) {
    this.router.navigate(['/instructor/assignment-view/', assignmentId]);
  }

}
