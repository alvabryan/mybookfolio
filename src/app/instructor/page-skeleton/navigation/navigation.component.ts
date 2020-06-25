import { Component, OnInit } from '@angular/core';
import { ToggleSideBarService } from '../toggle-side-bar.service';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/index';
import * as fromInstructor from '../../store/index';
import * as AuthActions from '../../..//auth/store/auth.actions';

import * as LogoutActions from '../../../store/logout-reducer/logout.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  instructorData: any;
  showApprovelTab = false;

  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromInstructor.State>, private toggleSideBar: ToggleSideBarService) { }

  ngOnInit() {
    this.subscription.add(
      this.store.select('auth').subscribe(data => {
        this.instructorData = data.user;
      })
    );

    this.subscription.add(
      this.store.select('instructor').subscribe(data => {
        if (data) {
          if (data.battalionUsers) {
            if (data.battalionUsers.linkedInstructors) {
              const battalionInstructors = Object.values(data.battalionUsers.linkedInstructors);
              const notApproved = battalionInstructors.filter((rdata: any) => {
                if (!rdata.approved) {
                  return rdata;
                }
              });
              if (notApproved.length > 0) {
                this.showApprovelTab = true;
              } else {
                this.showApprovelTab = false;
              }
            }
          }
        }
      })
    );
  }

  toggleBar() {
    this.toggleSideBar.toggleBar.next(true);
  }

  signout() {
    this.store.dispatch(new LogoutActions.Logout());
  }

}
