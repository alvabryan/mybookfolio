import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleSideBarService } from '../toggle-side-bar.service';
import { Store } from '@ngrx/store';
import * as fromInstructor from '../../store/index';
import * as remindersActions from '../../reminders/store/remainders.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  toggledBar = false;
  subscription: Subscription;

  constructor(private toggleSideBar: ToggleSideBarService, private store: Store<fromInstructor.State>) {
    this.subscription = this.toggleSideBar.toggleBar.subscribe(toggle => {

      if (toggle === this.toggledBar) {
        this.toggledBar = false;
      } else {
        this.toggledBar = true;
      }
    });
   }

   ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
