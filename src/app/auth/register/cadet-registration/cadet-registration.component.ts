import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

//ngrx
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../store/index';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-cadet-registration',
  templateUrl: './cadet-registration.component.html',
  styleUrls: ['./cadet-registration.component.css']
})
export class CadetRegistrationComponent implements OnInit {

  isLoading = false;

  constructor(private store: Store<fromRoot.State>, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

    // checks wether form was valid
    if ( !form.valid ) {
      return;
    }

    // user defined here
    const user = {
      battalionCode: form.value.battalionCode, 
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      letLevel: form.value.letLevel,
      classPeriod: form.value.classPeriod,
      password: form.value.password
    }

    // password validation
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if ( password !== confirmPassword ) {
      this.flashMessage.show('Confirm password does not match password.', {cssClass: 'alert-danger', timeout: 3000});
    } else {
      this.store.dispatch(AuthActions.cadetSignupStart(user));
    }

    this.store.pipe(select('auth')).subscribe(data => {
      this.isLoading = data.loading;
      if(data.authError){
        // this.flashMessage.show(data.authError.error, {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
