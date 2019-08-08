import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToggleSideBarService } from '../toggle-side-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  toggledBar = false;
  subscription: Subscription;

  constructor(private toggleSideBar: ToggleSideBarService) {
    this.subscription = this.toggleSideBar.toggleBar.subscribe(toggle => {

      if (toggle === this.toggledBar) {
        this.toggledBar = false;
      } else {
        this.toggledBar = true;
      }
    });
   }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
