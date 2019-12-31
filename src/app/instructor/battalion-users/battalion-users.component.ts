import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// ngrx
import { Store } from '@ngrx/store';
import * as fromInstructor from '../store/index';
import * as battalionUsersActions from './store/battalion-users.actions';

@Component({
  selector: 'app-battalion-users',
  templateUrl: './battalion-users.component.html',
  styleUrls: ['./battalion-users.component.css']
})
export class BattalionUsersComponent implements OnInit {

  constructor(private store: Store<fromInstructor.State>) { }

  linkedInstructors: Array<any>;
  cadetStaff: Array<any>;

  ngOnInit() {
    this.store.dispatch(battalionUsersActions.getBattalionUsers());

    this.store.select('instructor').subscribe((data: any) => {
      if (data.battalionUsers) {
        if (data.battalionUsers.linkedInstructors) {
          const linkedInstructors: object = data.battalionUsers.linkedInstructors;
          const linkedInstructorsArray = [];
          Object.keys(linkedInstructors).forEach((key, index) => {
            const linkedInstructorsValues = Object.values(linkedInstructors);
            const objToAdd = Object.assign(linkedInstructorsValues[index], {uid: key});
            linkedInstructorsArray.push(objToAdd);
          });

          this.linkedInstructors = linkedInstructorsArray;
        }
        // if (data.batttalionUsers.cadetStaff) {
        //   const values = Object.values(data.battalionUsers.cadetStaff);
        //   this.cadetStaff = values;
        //   console.log(this.cadetStaff);
        // }
      }
    });
  }

  formMethod(uid, v1, v2, v3, v4) {
    const newLetLevelAssign = {let1: v1.checked, let2: v2.checked, let3: v3.checked, let4: v4.checked};
    this.store.dispatch(battalionUsersActions.updateInstructorLetAssign({instructorUid: uid, letAssigned: newLetLevelAssign}));
  }

}
