import { Component, OnInit } from '@angular/core';

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
          const values = Object.values(data.battalionUsers.linkedInstructors);
          this.linkedInstructors = values;
          console.log(this.linkedInstructors);
        }
        // if (data.batttalionUsers.cadetStaff) {
        //   const values = Object.values(data.battalionUsers.cadetStaff);
        //   this.cadetStaff = values;
        //   console.log(this.cadetStaff);
        // }
      }
    });
  }

}
