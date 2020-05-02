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
  battalionCode: string;

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
          this.battalionCode = data.battalionUsers.battalionCode;
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
    const newLetLevelAssign = [];
    if ( v1.checked ) { newLetLevelAssign.push(1); }
    if ( v2.checked ) { newLetLevelAssign.push(2); }
    if ( v3.checked ) { newLetLevelAssign.push(3); }
    if ( v4.checked ) { newLetLevelAssign.push(4); }

    this.store.dispatch(battalionUsersActions.updateInstructorLetAssign({instructorUid: uid, letAssigned: newLetLevelAssign}));
  }

  approveInstructor(instructorUid: string) {
    this.store.dispatch(battalionUsersActions.updateInstructorStatus({battalionCode: this.battalionCode, uid: instructorUid}));
  }

}
