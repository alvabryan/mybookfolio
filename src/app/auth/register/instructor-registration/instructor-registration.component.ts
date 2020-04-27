import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

// from root
import * as fromRoot from '../../../store/index';
import * as authActions from '../../store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instructor-registration',
  templateUrl: './instructor-registration.component.html',
  styleUrls: ['./instructor-registration.component.css']
})
export class InstructorRegistrationComponent implements OnInit {

  instructorSignupType: string;

  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {

  }

  // sets UI pages
  setSignupType(data: string) {
    this.instructorSignupType = data;
  }

}
