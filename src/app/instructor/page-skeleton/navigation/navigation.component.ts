import { Component, OnInit } from '@angular/core';
import { ToggleSideBarService } from '../toggle-side-bar.service';
import { AuthService } from 'src/app/auth/auth.service';
import { InstructorService } from '../../instructor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  instructorData: any;

  subscription: Subscription = new Subscription();

  constructor(private toggleSideBar: ToggleSideBarService, private auth: AuthService, private instructorService: InstructorService) { }

  ngOnInit() {
    this.subscription.add(
      this.instructorService.instructorData.subscribe((data: any) => {
        this.instructorData = data;
      })
    );
  }

  toggleBar() {
    this.toggleSideBar.toggleBar.next(true);
  }

  signout() {
    this.auth.logout();
  }

}
