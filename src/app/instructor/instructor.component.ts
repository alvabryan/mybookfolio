import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit, OnDestroy {

  private cadetSubscription: Subscription = new Subscription();

  user: firebase.User;
  userLoaded = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.cadetSubscription.add(this.auth.user.subscribe( user => {
      this.user = user;
      this.userLoaded = true;
    }));
  }

  ngOnDestroy() {
    this.cadetSubscription.unsubscribe();
  }


}
