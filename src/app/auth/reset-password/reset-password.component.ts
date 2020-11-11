import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FlashMessagesService } from 'angular2-flash-messages';
import { take } from 'rxjs/operators';

import * as authActions from '../store/auth.actions';
import * as fromRoot from '../../store/index';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isLoading: boolean;

  constructor(private store: Store<fromRoot.State>, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  resetPassword(form: NgForm) {

    if ( !form.valid ) {
      return;
    }

    this.isLoading = true;

    this.store.dispatch(authActions.passwordReset({email: form.value.email}));

    this.flashMessages.show('Please check your email.', {cssClass: 'alert-success', timeout: 2000});
    this.isLoading = false;
    form.reset();
  }
}
