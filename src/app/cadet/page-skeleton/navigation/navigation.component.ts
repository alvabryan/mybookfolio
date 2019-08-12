import { Component, OnInit } from '@angular/core';
import { ToggleSideBarService } from '../toggle-side-bar.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private toggleSideBar: ToggleSideBarService, private auth: AuthService) { }

  ngOnInit() {
  }

  toggleBar() {
    this.toggleSideBar.toggleBar.next(true);
  }

  signout() {
    this.auth.logout();
  }

}
