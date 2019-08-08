import { Component, OnInit } from '@angular/core';
import { ToggleSideBarService } from '../toggle-side-bar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private toggleSideBar: ToggleSideBarService) { }

  ngOnInit() {
  }

  toggleBar() {
    this.toggleSideBar.toggleBar.next(true);
  }

}
