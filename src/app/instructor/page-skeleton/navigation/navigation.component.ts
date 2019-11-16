import { Component, OnInit } from '@angular/core';
import { ToggleSideBarService } from '../toggle-side-bar.service';
import { Subscription } from 'rxjs';

//ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/index';
import * as AuthActions from '../../..//auth/store/auth.actions';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  instructorData: any;

  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromRoot.State>,private toggleSideBar: ToggleSideBarService) { }

  ngOnInit() {
    this.subscription.add(
      this.store.select('auth').subscribe(data => {
        this.instructorData = data.user;
      })
    );
  }

  toggleBar() {
    this.toggleSideBar.toggleBar.next(true);
  }

  signout() {
    this.store.dispatch(AuthActions.logout());
  }

}
