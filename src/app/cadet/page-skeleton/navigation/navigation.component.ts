import { Component, OnInit } from '@angular/core';
import { ToggleSideBarService } from '../toggle-side-bar.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/index';
import * as LogoutActions from '../../../store/logout-reducer/logout.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>,private toggleSideBar: ToggleSideBarService) { }

  ngOnInit() {
  }

  toggleBar() {
    this.toggleSideBar.toggleBar.next(true);
  }

  signout() {
    this.store.dispatch(new LogoutActions.Logout());
  }

}
