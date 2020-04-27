import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

// ngrx
import * as fromRoot from '../../../../store/index';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth.actions';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-battalion-instructor-registration',
  templateUrl: './battalion-instructor-registration.component.html',
  styleUrls: ['./battalion-instructor-registration.component.css']
})
export class BattalionInstructorRegistrationComponent implements OnInit {

  isLoading: any;
  subscription: Subscription = new Subscription();


  constructor(private store: Store<fromRoot.State>, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select('auth')).subscribe((data: any) => {
        this.isLoading = data.loading;
        if (data.authError) {
          this.flashMessage.show(data.authError, {cssClass: 'alert-danger', timeout: 3000});
        }
      })
    );
  }

  onInstructorSignup(form: NgForm) {
    const formData = form.value;
    if (this.checkPassword(formData.password, formData.confirmPassword)) {
      this.isLoading = true;
      this.store.dispatch(AuthActions.battalionRegisterStart({
        registrationType: 'instructor',
        ...formData
      }));
    }
  }

  // checks whether confirm password matches password
  checkPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      this.flashMessage.show('Confirm password does not match password.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } else {
      return true;
    }
  }

}
